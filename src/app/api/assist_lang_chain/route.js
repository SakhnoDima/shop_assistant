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

import axios from "axios";
import path from "path";

import { retriever, combineDoc, dialogToString } from "@/helpers/utils/index";
import { filePathNewText } from "../get_categories/route";
import { answerTemplate, standAloneQuestion } from "./templates";

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
    await axios.get(`${process.env.CURRENT_URL}/api/get_categories`);
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

    const standAloneQuestionPrompt =
      PromptTemplate.fromTemplate(standAloneQuestion);

    const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

    const firstChain = standAloneQuestionPrompt
      .pipe(chatModel)
      .pipe(new StringOutputParser());
    // .pipe((prevMess) => console.log(prevMess));

    const retrievalChain = RunnableSequence.from([
      (prevResult) => prevResult.standalone_question,
      retriever,
      combineDoc,
      // (prevMess) => console.log(prevMess),
    ]);

    const answerChain = answerPrompt
      .pipe(chatModel)
      .pipe(new StringOutputParser());
    //.pipe((prevMess) => console.log(prevMess));

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
