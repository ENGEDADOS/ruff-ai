import { UpdateCommentParams } from "./types.js";

export async function updateComment({ context, body, commentId }: UpdateCommentParams) {
  return await context.octokit.issues.updateComment({
    ...context.issue(),
    comment_id: commentId,
    body
  });
}