import { Context } from "probot";

export type CreateCommentParams = {
  context: Context;
  body: string;
}