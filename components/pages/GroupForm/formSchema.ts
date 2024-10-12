import { z } from 'zod';

export const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: '그룹명을 입력해주세요' }),
});

export type GroupFormSchema = z.infer<typeof formSchema>;
