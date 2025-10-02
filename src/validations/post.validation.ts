import { z } from "zod";

export const postSchema = z.object({
    title: z.string().min(3, "title must be 3 chars"),
    content: z.string().min(5, "content must be 5 chars")
});