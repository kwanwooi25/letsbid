'use client';

import { useSession } from 'next-auth/react';

export function useIsGroupHost(groupHostId?: string, userId?: string) {
  const session = useSession();
  const criteriaUserId = userId ?? session?.data?.user?.id;

  return { isGroupHost: groupHostId === criteriaUserId };
}
