import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export const assistant = async () => {
  //Step 2: Create a Thread
  const thread = await openai.beta.threads.create();

  //Step 3: Add a Message to a Thread
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: "I need red t-short, do you have?",
  });

  //Step 4: Run the Assistant
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: "asst_baXTnWTVmBXF1VEE1HMdU10U",
    instructions: "Please answer questions",
  });

  console.log(run);
  console.log("++++++++++++++++++++++++++++++");
  //Step 6: Display the Assistant's Response
  const messages = await openai.beta.threads.messages.list(thread.id);
  console.log(messages);
};
