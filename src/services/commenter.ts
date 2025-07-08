import { Context } from "probot";

export async function sendComment(context: Context, body: string) {
  const issueComment = context.issue({ body });
  const comment = await context.octokit.issues.createComment(issueComment);
  return comment.data; 
}