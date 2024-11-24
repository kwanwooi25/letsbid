'use client';

import { useSession } from 'next-auth/react';
import { GroupWithMembers } from './types';

export function useIsGroupMember(group?: GroupWithMembers, userId?: string) {
  const session = useSession();
  const criteriaUserId = userId ?? session?.data?.user?.id;
  const isGroupHost = group?.hostId === criteriaUserId;
  const isViceGroupHost = !!criteriaUserId && (group?.viceHostIds ?? []).includes(criteriaUserId);
  const isGroupMember =
    (group?.members.filter((member) => member.userId === criteriaUserId) ?? []).length > 0;

  return { isGroupHost, isViceGroupHost, isGroupMember };
}
