import OpenAI from "openai";
import axios from "axios";
import { NextResponse } from "next/server";
import * as fs from "fs";

import { filePath } from "../get_categories/route";
import { FILE_NAME } from "@/constants/constants";

const oneHours = 60 * 60 * 1000;

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  dangerouslyAllowBrowser: true,
});

const uploadFile = async () => {
  // get categories from DB and save as file
  await axios.get("http://localhost:3000/api/get_categories");

  // create file to loading
  const file = await openai.files.create({
    file: fs.createReadStream(filePath),
    purpose: "assistants",
  });

  // load file to assistant
  const myAssistantFile = await openai.beta.assistants.files.create(
    process.env.ASSISTANT_ID,
    {
      file_id: file.id,
    }
  );

  //if load was successful remove file
  if (myAssistantFile) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File is  deleted.");
      }
    });
  }
};

const assistantFilesUploader = async () => {
  // get all files
  const list = await openai.files.list();
  // get files from assistant
  const assFilesList = await openai.beta.assistants.files.list(
    process.env.ASSISTANT_ID
  );

  // find file saved before
  const filesFromGprData = list.data.find(
    ({ filename }) => filename === FILE_NAME
  );
  console.log(filesFromGprData);
  // if file not exist or file created more than one before - update

  if (!filesFromGprData) {
    await uploadFile();
    return;
  }
  const fileInAssistant = assFilesList.data.find(
    ({ id }) => id === filesFromGprData.id
  );

  if (
    !fileInAssistant ||
    Date.now() - filesFromGprData.created_at * 1000 > oneHours
  ) {
    console.log(1);
    //if file is exist remove from storage and assistant
    if (filesFromGprData) {
      await openai.files.del(filesFromGprData.id);
      await openai.beta.assistants.files.del(
        process.env.ASSISTANT_ID,
        filesFromGprData.id
      );
    }
    await uploadFile();
  }
};

export const POST = async (request, response) => {
  const { userMessage } = await request.json();

  //! === add file === !///
  await assistantFilesUploader();

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
