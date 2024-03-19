import { NextResponse } from "next/server";

import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";

const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.API_KEY,
});

export async function GET(request, response) {
  const outputParser = new StringOutputParser();
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "Ти завжди відповідаєш як грубіян. "],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel).pipe(outputParser);

  const rez = await chain.invoke({
    input: "Розкажи жарт",
  });
  console.log(rez);
  return NextResponse.json({ message: rez });
}

export async function POST(request, response) {
  const { message } = await request.json();
  console.log(message);
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.API_KEY,
  });

  const loader = new CheerioWebBaseLoader(
    "http://localhost:3000/api/get_categories"
  );

  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter();

  const splitDocs = await splitter.splitDocuments(docs);

  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  const prompt =
    ChatPromptTemplate.fromTemplate(`You are shop assistant. You help user search products.
    All your answer is valid HTML. Return from example: 
    <div>
    <p>text</p>
    <a>link</a>
     If This products have category return to client valid html link.
    Links should be properly formatted as <a> tag with a valid "href" attribute, like http://localhost:3000/shop/filters/id, 
    where "id" is the category ID,
    "text" is your text that you add,
    "link" category name.
     All info exist only on the provided context:
<context>
{context}
</context>
Question: {input}`);

  const documentChain = await createStuffDocumentsChain({
    llm: chatModel,
    prompt,
  });

  const retriever = vectorstore.asRetriever();

  const retrievalChain = await createRetrievalChain({
    combineDocsChain: documentChain,
    retriever,
  });

  const result = await retrievalChain.invoke({
    input: message,
  });

  console.log(result.answer);

  return NextResponse.json({ message: result.answer });
}
