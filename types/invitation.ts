import { Group, Invitation, User } from '@prisma/client';

export type InvitationWithGroupAndInviter = Invitation & { group: Group; inviter: User };

export type InvitationResult = {
  result: 'SUCCESS' | 'FAIL';
  email: string;
  message: string;
}[];
