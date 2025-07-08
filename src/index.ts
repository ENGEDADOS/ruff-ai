import { Probot, Context } from "probot";
import openai from "./agents/openai.js";
import { HumanMessage } from "@langchain/core/messages";
import { sendComment } from "./services/commenter.js";

const messages = [
  new HumanMessage("Defina quem é o Kairo Kaleo, dê uma descrição detalhada dele em um poema"),
];

export default (app: Probot) => {
  app.on("pull_request.opened", async (context: Context) => {
    const processingMessage = "ℹ️ Note\n\nAtualmente processando novas mudanças nessa PR. Isso pode levar alguns minutos, por favor aguarde...";
    const processingComment = await sendComment(context, processingMessage);

    const response = await openai.invoke(messages);
    await sendComment(context, response.content.toString());

    await context.octokit.issues.deleteComment({
      ...context.issue(),
      comment_id: processingComment.id,
    });
  });
};