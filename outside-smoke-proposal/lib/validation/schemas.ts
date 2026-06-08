import { z } from 'zod';

export const programInfoSchema = z.object({
  program_name: z.string().min(1, 'Required'),
  program_type: z.string().optional(),
  notes: z.string().optional()
});

export const contactSchema = z.object({
  contact_name: z.string().min(1, 'Required'),
  contact_email: z.string().email('Invalid email')
});

export const baseQuestionnaireSchema = z.object({
  program_name: z.string().min(1),
  contact_name: z.string().min(1),
  contact_email: z.string().email()
});

export type QuestionnaireInputs = z.infer<typeof baseQuestionnaireSchema> & { answers?: Record<string, any> };
