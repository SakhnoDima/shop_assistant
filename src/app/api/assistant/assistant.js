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
  });

  const checkStatus = async (threadId, runId) => {
    const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    if (runStatus.status === "completed") {
      let messages = await openai.beta.threads.messages.list(thread.id);
      messages.data.forEach((item) => {
        const role = item.role;
        const content = item.content[0].text.value;
        console.log(
          `${role.charAt(0).toUpperCase() + role.slice(1)}:${content}`
        );
      });
    } else {
      console.log("Run is not completed");
    }
  };

  setTimeout(() => {
    checkStatus(thread.id, run.id);
  }, 10000);
};
