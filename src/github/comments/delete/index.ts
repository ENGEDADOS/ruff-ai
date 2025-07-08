import { DeleteCommentParams } from "./types.js";

export async function deleteComment({ context, commentId }: DeleteCommentParams) {
  return await context.octokit.issues.deleteComment({
    ...context.issue(),
    comment_id: commentId
  });
}