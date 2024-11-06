import { z } from 'zod';

export const formSchema = z.object({
  id: z.string().optional(),
  isExcluded: z.boolean().default(false),
  excludedReason: z.string().min(1, { message: '제외 사유를 입력해 주세요' }),
});

export type BidExclusionFormSchema = z.infer<typeof formSchema>;
