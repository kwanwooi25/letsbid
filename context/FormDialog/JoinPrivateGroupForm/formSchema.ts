import { z } from 'zod';

export const formSchema = z.object({
  groupId: z.string(),
  password: z.string().min(1, { message: '참여 코드를 입력해주세요' }),
});

export type JoinPrivateGroupFormSchema = z.infer<typeof formSchema>;
