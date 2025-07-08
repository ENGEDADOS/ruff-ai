import { Context } from "probot";

export type DeleteCommentParams = {
  context: Context;
  commentId: number;
}