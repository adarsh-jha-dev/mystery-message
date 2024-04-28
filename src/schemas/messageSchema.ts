import { z } from "zod";

export const MessageSchema = z.object({
  content: z.string().max(300, "Message should not exceed 300 characters"),
});
