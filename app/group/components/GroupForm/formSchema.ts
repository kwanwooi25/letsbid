import { z } from 'zod';

export const formSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, { message: '그룹명을 입력해주세요' }),
    description: z.string().optional().nullable(),
    isPrivate: z.boolean().default(false),
    password: z.string().optional().nullable(),
    maxMembers: z.coerce.number().int().default(1000),
  })
  .refine((data) => !data.isPrivate || (data.isPrivate && !!data.password), {
    message: '비공개 그룹은 비밀번호가 필요합니다',
    path: ['password'],
  });

export type GroupFormSchema = z.infer<typeof formSchema>;
