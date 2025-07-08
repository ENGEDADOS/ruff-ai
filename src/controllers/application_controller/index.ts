import { ProcessRequestParams } from "./types.js";
import { HumanMessage } from "@langchain/core/messages";
import openai from "../../agents/openai.js";
import { createComment } from "../../github/comments/create/index.js";
import { deleteComment } from "../../github/comments/delete/index.js";

export const processRequest = async({ context, event }: ProcessRequestParams) => {
  if (event !== "pull_request.opened" && event !== "issues.opened") {
    return;
  }

  const messages = [
    new HumanMessage("Defina quem é o Kairo Kaleo, dê uma descrição detalhada dele em um poema"),
  ];

  const processingMessage = "ℹ️ Note\n\nAtualmente processando novas mudanças nessa PR. Isso pode levar alguns minutos, por favor aguarde...";
  const processingComment = await createComment({ context, body: processingMessage });

  const response = await openai.invoke(messages);

  await createComment({ context, body: response.content.toString() });
  await deleteComment({ context, commentId: processingComment.id });
}