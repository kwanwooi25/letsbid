import { z } from 'zod';

export const formSchema = z.object({
  groupId: z.string(),
  inviteeEmail: z
    .string()
    .min(1, { message: '초대할 이메일 주소를 입력해주세요' })
    .email({ message: '올바른 이메일 주소를 입력해주세요' }),
});

export type InvitationFormSchema = z.infer<typeof formSchema>;
