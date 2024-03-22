import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { TextLoader } from "langchain/document_loaders/fs/text";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";

import path from "path";
import { retriever, combineDoc, dialogToString } from "@/helpers/utils/index";
import { filePathNewText } from "../get_categories/route";

const filePath = path.join(process.cwd(), "new-data", "data.txt");

const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.API_KEY,
});

const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.API_KEY,
  modelName: "gpt-3.5-turbo-1106",
  temperature: 0.5,
});

//? save to stor
export async function GET(request, response) {
  try {
    const categoriesLoader = new TextLoader(filePathNewText);
    const categoriesDocs = await categoriesLoader.load();

    const textLoader = new TextLoader(filePath);
    const docs = await textLoader.load();

    const categorySplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 50,
      separators: ["\n\n", "\n"],
      chunkOverlap: 10,
    });

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 200,
      separators: ["\n\n"],
      chunkOverlap: 10,
    });

    const splitedText = await textSplitter.splitDocuments(docs);
    const splitCategory = await categorySplitter.splitDocuments(categoriesDocs);

    await SupabaseVectorStore.fromDocuments(splitedText, embeddings, {
      client,
      tableName: "documents",
    });

    await SupabaseVectorStore.fromDocuments(splitCategory, embeddings, {
      client,
      tableName: "documents",
    });

    return NextResponse.json({ message: "data is saved" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}

// ? POST
export async function POST(request, response) {
  const { message, dialog } = await request.json();

  try {
    const allMessages = dialogToString(dialog);

    const standAloneQuestion = `Given some conversation history (if any) and a question, convert the question to a stand alone question. 
    conversation history: {convHistory}
    question:{question}
    standalone question: `;

    const standAloneQuestionPrompt =
      PromptTemplate.fromTemplate(standAloneQuestion);

    const answerTemplate = `You are helpful and enthusiastic shop assistant. You can help user sea rch products and answer given question about products, deliver and payment by the question and conversation history. Try to found answer in context. If the answer is not in the context, find the answer in the conversation history if possible. If you really do not know the answer ask the user about the possibility of contacting a manager. If the user agrees, request their phone number and direct this number and question to the email: sahnodima@icloud.com. Give this link:
     ${process.env.CURRENT_URL}/support if user asking about additional information on delivery or payment or returns. Always speak as if you were chatting to a friend. 
     All your answer is valid HTML. Return from example:
     <div>
     <p>text</p>
     </div>
    "text" is your comments.

    If a user is looking for a product, try to find a category name with id. If such a category name does not exist, suggest the user to contact the manager. If the user agrees, request their phone number and direct this number and question to the email: sahnodima@icloud.com. Give this link:
     ${process.env.CURRENT_URL}/support if user asking about additional information on delivery or payment or returns.
     If user searching for product return from example:
     <div>
     <p>text</p>
     <a>link</a> 
     </div>

     Link should be properly formatted as <a> tag with a valid "href" attribute, like ${process.env.CURRENT_URL}shop/filters/id,
     where "id" is the id belonging to the searched product,
     "text" is your comments,
     "link" category name.

      All info exist only on the provided context.
     context: {context}
     question: {question}
     conversation history: {convHistory}
     answer:`;

    const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

    const firstChain = standAloneQuestionPrompt
      .pipe(chatModel)
      .pipe(new StringOutputParser());

    const retrievalChain = RunnableSequence.from([
      (prevResult) => prevResult.standalone_question,
      retriever,
      combineDoc,
    ]);

    const answerChain = answerPrompt
      .pipe(chatModel)
      .pipe(new StringOutputParser());

    const chain = RunnableSequence.from([
      {
        standalone_question: firstChain,
        originalInput: new RunnablePassthrough(),
      },
      {
        context: retrievalChain,
        question: ({ originalInput: { question } }) => question,
        convHistory: ({ originalInput: { convHistory } }) => convHistory,
      },
      answerChain,
    ]);

    const res = await chain.invoke({
      question: message,
      convHistory: allMessages,
    });

    return NextResponse.json({ message: res });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message });
  }
}
