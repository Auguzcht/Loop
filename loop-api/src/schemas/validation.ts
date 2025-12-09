import { z } from 'zod';

// Answer schema
export const AnswerSchema = z.object({
  id: z.string().min(1),
  value: z.union([z.string(), z.number(), z.array(z.number())]),
});

// Grade request schema
export const GradeRequestSchema = z.object({
  answers: z.array(AnswerSchema).min(1).max(12),
});

// Export TypeScript types
export type AnswerInput = z.infer<typeof AnswerSchema>;
export type GradeRequestInput = z.infer<typeof GradeRequestSchema>;
