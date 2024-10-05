import { z } from 'zod';

export const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: '이름을 입력해주세요' }),
});

export type UserFormSchema = z.infer<typeof formSchema>;
