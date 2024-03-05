import OpenAI from "openai";

export const getProductsByCategory = async (categories) => {
  const searchCategories = JSON.parse(categories);
  console.log(searchCategories.category);
  try {
    const res = await axios.get(BASE_URL + `products`, {
      params: {
        category: searchCategories.category,
      },
      auth: authData,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error(error.message || "Failed to fetch products", {
      status: error.response ? error.response.status : 500,
    });
  }
};

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export const assistant = async () => {
  // ==========  Step 2: Create a Thread
  const thread = await openai.beta.threads.create();

  //Step 3: Add a Message to a Thread
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: "I want shoes do you have?",
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
    } else if (runStatus.status === "requires_action") {
      const actions = runStatus.required_action.submit_tool_outputs;

      for (const action of actions["tool_calls"]) {
        const fooName = action.function.name;
        const arg = action.function.arguments;
        if (fooName === "get_products") {
          const data = await getProductsByCategory(arg);
          console.log(data);
        }
      }
    } else {
      console.log("Run is not completed");
    }
  };

  setTimeout(() => {
    checkStatus(thread.id, run.id);
  }, 10000);
};
