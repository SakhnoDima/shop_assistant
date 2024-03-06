import OpenAI from "openai";
import { NextResponse, NextRequest } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  dangerouslyAllowBrowser: true,
});

export const POST = async (request, response) => {
  const { userMessage } = await request.json();

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
      // Wait for a bit before checking the status again
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
      runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    }
    let messages = await openai.beta.threads.messages.list(threadId);
    const answer = messages.data.filter((el) => el.role === "assistant");
    return answer[0].content[0].text.value;
  };

  let data = await checkStatus(thread.id, run.id);

  // Assuming NextResponse.json is your way to return JSON response
  // Replace it with the correct method according to your framework
  return NextResponse.json({ resMess: data });
};
