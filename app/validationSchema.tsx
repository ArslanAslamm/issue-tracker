import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(255),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(255),
});
