"use server";
import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";

import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

import { ROLE } from "@/constants/constants";

const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.API_KEY,
  modelName: "gpt-3.5-turbo-1106",
  temperature: 0.5,
});

const SYSTEM_TEMPLATE = `You are shop assistant. You help user search products.
     All your answer is valid HTML. Return from example:
     <div>
     <p>text</p>
     <a>link</a>
     </div>
      If This products have category return to client valid html link.
     Links should be properly formatted as <a> tag with a valid "href" attribute, like ${process.env.CURRENT_URL}/shop/filters/id,
     where "id" is the category ID,
     "text" is your text that you add,
     "link" category name.
     If the result is not determined, ask the user about the possibility of contacting a manager. If the user agrees, request their phone number and send this number to the email: sahnodima@icloud.com.
     When ordering, you must make an advance payment equivalent to at least 10% of the order value.
     Payment Methods:
     1.Full prepayment to a bank card. 2. Payment upon receipt.
     Possible delivery methods: 
     1. Nova Poshta 2. Meest Express 3. Ukrposhta.
     Tariffs, costs and delivery times can be obtained from delivery operators.
     The order is dispatched within two working days.
     For additional information on delivery, payment and returns, you can follow the link: ${process.env.CURRENT_URL}/support.
     The product can be returned or exchanged within 14 days after receipt at the points of delivery of postal operators.
     Products that cannot be returned category: "shorts".
      All info exist only on the provided context:
 <context>
 {context}
 </context>`;

export async function POST(request, response) {
  const { dialog } = await request.json();

  let messages = [];

  dialog?.map(({ message, role }) => {
    role === ROLE.user
      ? messages.push(new HumanMessage(message))
      : messages.push(new AIMessage(message));
  });

  const loader = new CheerioWebBaseLoader(
    "http://localhost:3000/api/get_categories"
  );

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const rawDocs = await loader.load();

  const allSplits = await textSplitter.splitDocuments(rawDocs);

  const vectorstore = await MemoryVectorStore.fromDocuments(
    allSplits,
    new OpenAIEmbeddings({
      openAIApiKey: process.env.API_KEY,
    })
  );

  const retriever = vectorstore.asRetriever(4);

  const docs = await retriever.invoke("");

  const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
    ["system", SYSTEM_TEMPLATE],
    new MessagesPlaceholder("messages"),
  ]);

  const documentChain = await createStuffDocumentsChain({
    llm: chatModel,
    prompt: questionAnsweringPrompt,
  });

  const res = await documentChain.invoke({
    messages,
    context: docs,
  });

  return NextResponse.json({ message: res });
}
