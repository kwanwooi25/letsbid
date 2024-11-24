'use client';

import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { GroupWithMembers } from './types';

export function useIsGroupMember(group?: GroupWithMembers, userId?: string) {
  const { loggedInUser } = useLoggedInUser();
  const criteriaUserId = userId ?? loggedInUser?.id;
  const isGroupHost = group?.hostId === criteriaUserId;
  const isViceGroupHost = !!criteriaUserId && (group?.viceHostIds ?? []).includes(criteriaUserId);
  const isGroupMember =
    (group?.members.filter((member) => member.userId === criteriaUserId) ?? []).length > 0;

  return { isGroupHost, isViceGroupHost, isGroupMember };
}
