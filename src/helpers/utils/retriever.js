import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";

const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.API_KEY,
});

const vectorStore = new SupabaseVectorStore(embeddings, {
  client,
  tableName: "documents",
  queryName: "match_documents",
});

export const retriever = vectorStore.asRetriever();
