import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// const chatModel = new ChatOpenAI({
//   openAIApiKey: process.env.API_KEY,
// });

export const GET = async () => {
  return NextResponse.json({
    status: 200,
    message: "Data is successfully saved",
  });
};

const outputParser = new StringOutputParser();

const splitter = new RecursiveCharacterTextSplitter();

const Brand = () => {
  (async () => {
    const loader = new CheerioWebBaseLoader(
      "https://docs.smith.langchain.com/user_guide"
    );
    const docs = await loader.load();

    console.log(docs);
    console.log(docs[0].pageContent.length);
    const splitDocs = await splitter.splitDocuments(docs);

    console.log(splitDocs.length);
    console.log(splitDocs[0].pageContent.length);

    // const prompt = ChatPromptTemplate.fromMessages([
    //   ["system", "Ты отвечаешь как грубиян"],
    //   ["user", "{input}"],
    // ]);

    // const chain = prompt.pipe(chatModel).pipe(outputParser);

    // const rez = await chain.invoke({
    //   input: "Добрый день, как у Вас дела?",
    // });
  })();
  return <div>brand</div>;
};

export default Brand;
