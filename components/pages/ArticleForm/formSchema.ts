import { z } from 'zod';

export const formSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().optional(),
    contentHtml: z.string().optional(),
    isPublished: z.boolean().default(false),
    auctionCaseId: z.string().optional().nullable(),
  })
  .refine((data) => (data.isPublished && !!data.title) || !data.isPublished, {
    message: '제목을 입력해주세요',
    path: ['title'],
  });

export type ArticleFormSchema = z.infer<typeof formSchema>;
