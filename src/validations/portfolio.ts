import { z } from "zod";

export const portfolioSchema = z.object({
  title: z
    .string()
    .min(1, "Portfolio name is required")
    .max(100, "Name can't exceed 100 characters"),
  userId: z.string().uuid(),
});
