'use client';

import { PATHS } from '@/const/paths';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { useRouter } from 'next/navigation';

export function useHomeHeaderButtons() {
  const router = useRouter();
  const currentUrl = useCurrentUrl();

  const moveToInvitations = () => router.push(PATHS.INVITATION, { scroll: false });

  const moveToCreateGroup = () =>
    router.push(`${PATHS.CREATE_GROUP}?callbackUrl=${currentUrl}`, { scroll: false });

  return {
    moveToInvitations,
    moveToCreateGroup,
  };
}
