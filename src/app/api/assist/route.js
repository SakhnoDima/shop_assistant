import OpenAI from "openai";
import { NextResponse } from "next/server";
import * as fs from "fs";

import { filePath, fileName } from "../get_categories/route";

const twoHours = 60 * 60 * 1000;

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  dangerouslyAllowBrowser: true,
});

const assistantFilesUpload = async () => {
  const list = await openai.files.list();

  const { created_at, id } = list.data.find(
    ({ filename }) => filename === fileName
  );

  if (Date.now() - created_at * 1000 > twoHours) {
    await openai.beta.assistants.files.del(process.env.ASSISTANT_ID, id);

    const file = await openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "assistants",
    });
    const myAssistantFile = await openai.beta.assistants.files.create(
      process.env.ASSISTANT_ID,
      {
        file_id: file.id,
      }
    );
  }
};

export const POST = async (request, response) => {
  const { userMessage } = await request.json();

  //! === add file === !///
  await assistantFilesUpload();

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
