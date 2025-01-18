const { OpenAI } = require("langchain/llms/openai");
const { PromptTemplate } = require("langchain/prompts");
const { LLMChain } = require("langchain/chains");
require("dotenv").config();
const apiKey = process.env.OPENAI_API_KEY;
// Initialize OpenAI LLM (you can use GPT-4 or GPT-3.5)
const llm = new OpenAI({
  temperature: 0.7,
  modelName: "gpt-3.5-turbo",
  openAIApiKey: apiKey
});

// Define the prompt template
const prompt = new PromptTemplate({
  inputVariables: ["tasks"],
  template: `You are a productivity assistant. Given the following tasks:
{tasks}
1. Prioritize them based on urgency and type.
2. Suggest any motivational tips or productivity advice.`,
});

// Create the LangChain
const chain = new LLMChain({ llm, prompt });


const prioritizeTasks = async (tasks) => {
  const taskDescriptions = tasks
    .map((task) => `- ${task.title} (Deadline: ${task.deadline}, Type: ${task.type})`)
    .join("\n");
  return await chain.run({ tasks: taskDescriptions });
};

module.exports = { prioritizeTasks };
