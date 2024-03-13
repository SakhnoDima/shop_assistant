import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export const chatAssist = async (userMess) => {
  // ==========  Step 2: Create a Thread
  const thread = await openai.beta.threads.create();

  //Step 3: Add a Message to a Thread
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: userMess,
  });

  //Step 4: Run the Assistant
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: "asst_LP4bFaaXp4kZDRT7yEqi8L0d",
  });

  const checkStatus = async (threadId, runId) => {
    const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
    if (runStatus.status === "completed") {
      let messages = await openai.beta.threads.messages.list(thread.id);
      const unswear = messages.data.filter((el) => el.role === "assistant");

      console.log(unswear[0].content[0].text.value);
      return unswear[0].content[0].text.value;

      //   messages.data.forEach((item) => {
      //     const role = item.role;
      //     const content = item.content[0].text.value;
      //     console.log(
      //       `${role.charAt(0).toUpperCase() + role.slice(1)}:${content}`
      //     );
      //   });
    } else {
      return new Error("Run is not completed");
    }
  };
  let data;
  setTimeout(async () => {
    data = await checkStatus(thread.id, run.id);
  }, 5000);
  return data;
};
