 import { Probot } from "probot";

export default (app: Probot) => {
  app.on("pull_request.opened", async (context) => {
    const issueComment = context.issue({
      body: "para de encher meu saco",
    });
    await context.octokit.issues.createComment(issueComment);
  });
};
