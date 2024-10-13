import { z } from 'zod';

export const formSchema = z.object({
  groupId: z.string(),
  inviteeEmails: z.array(z.string().email()),
});

export type InvitationFormSchema = z.infer<typeof formSchema>;
