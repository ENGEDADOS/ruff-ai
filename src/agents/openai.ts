import { ChatOpenAI } from "@langchain/openai";

export default new ChatOpenAI({ apiKey: process.env.OPENAI_API_KEY, model: "gpt-3.5-turbo" });