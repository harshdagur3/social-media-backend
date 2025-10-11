import { z } from "zod";

export const createCommentSchema = z.object({
    text: z.string().min(1, "comment text required")
});

export const updateCommentSchema = z.object({
    text: z.string().min(1, "updated comment text required")
});
