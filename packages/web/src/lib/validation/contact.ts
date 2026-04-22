import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "name_too_short").max(120, "name_too_long"),
  email: z.string().trim().email("email_invalid").max(200, "email_too_long"),
  subject: z.string().trim().max(200, "subject_too_long").optional().default(""),
  message: z.string().trim().min(10, "message_too_short").max(5000, "message_too_long"),
  sculpture: z.string().trim().max(200).optional().default(""),
  company: z.string().max(0, "honeypot_filled").optional().default(""),
  "cf-turnstile-response": z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
