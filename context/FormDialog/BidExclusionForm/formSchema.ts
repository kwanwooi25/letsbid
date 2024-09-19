import { z } from 'zod';

export const formSchema = z.object({
  id: z.string().optional(),
  isExcluded: z.boolean().default(false),
  excludedReason: z.string().optional(),
});

export type BidExclusionFormSchema = z.infer<typeof formSchema>;
