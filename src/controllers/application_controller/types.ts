import { Context } from "probot";

export type ProcessRequestParams = {
  context: Context;
  event: "pull_request.opened" | "issues.opened";
}