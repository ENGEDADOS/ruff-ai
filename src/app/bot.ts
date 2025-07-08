import { Probot } from "probot";
import openai from "../agents/openai.ts";
import { HumanMessage } from "@langchain/core/messages";

const messages = [
  new HumanMessage("Defina quem é o Kairo Kaleo, dê uma descrição detalhada dele em um poema"),
]

export default (app: Probot) => {
  app.on("pull_request.opened", async (context) => {
    const response = await openai.invoke(messages);
    const issueComment = context.issue({
      body: response.content.toString(),
    });
    await context.octokit.issues.createComment(issueComment);
  });
};
