import { NextResponse } from "next/server";

import { ChatOpenAI } from "@langchain/openai";
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { StringOutputParser } from "@langchain/core/output_parsers";

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

// export async function GET(request, response) {
// const outputParser = new StringOutputParser();
//   const prompt = ChatPromptTemplate.fromMessages([
//     ["system", "Ти відповідаєш Українською. Дуже грубо"],
//     ["user", "{input}"],
//   ]);

//   const chain = prompt.pipe(chatModel).pipe(outputParser);

//   const rez = await chain.invoke({
//     input: "Розкажи жарт",
//   });
//   console.log(rez);
//   return NextResponse.json({ message: rez });
// }

export async function GET(request, response) {
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.API_KEY,
  });

  const loader = new CheerioWebBaseLoader(
    "https://docs.smith.langchain.com/user_guide"
  );

  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter();

  const splitDocs = await splitter.splitDocuments(docs);

  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  const prompt =
    ChatPromptTemplate.fromTemplate(`Answer the following question based only on the provided context:
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
    input: "what is LangSmith?",
  });

  console.log(result.answer);

  return NextResponse.json({ message: "ok" });
}
