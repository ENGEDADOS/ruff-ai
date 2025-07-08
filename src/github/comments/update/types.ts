import { Context } from "probot";

export type UpdateCommentParams = {
     context: Context
     body: string;
     commentId: number;
}