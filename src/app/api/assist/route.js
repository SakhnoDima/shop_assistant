import OpenAI from "openai";
import { NextResponse } from "next/server";
import * as fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  dangerouslyAllowBrowser: true,
});

export const POST = async (request, response) => {
  const { userMessage } = await request.json();

  //! === add file === !///
  console.log(process.cwd());
  // const file = await openai.files.create({
  //   file: fs.createReadStream(__dirname + "data.json"),
  //   purpose: "assistants",
  // });

  //  console.log(file);
  // ==========  Step 1: Create a Thread
  const thread = await openai.beta.threads.create();
  //Step 2: Add a Message to a Thread
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: userMessage,
  });
  //Step 3: Run the Assistant
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: process.env.ASSISTANT_ID,
  });

  const checkStatus = async (threadId, runId) => {
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    while (runStatus.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    }
    let messages = await openai.beta.threads.messages.list(threadId);
    const answer = messages.data.filter((el) => el.role === "assistant");
    return answer[0].content[0].text.value;
  };

  let data = await checkStatus(thread.id, run.id);

  return NextResponse.json({ resMess: data });
};
