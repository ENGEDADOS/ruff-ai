import { CreateCommentParams } from "./types.js";

export async function createComment({ context, body }: CreateCommentParams) {
  const comment = await context.octokit.issues.createComment(context.issue({ body }));
  return comment.data;
}