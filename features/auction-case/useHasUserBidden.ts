'use client';

import { getHasBidden } from '@/features/auction-case/utils';
import { AuctionCaseLike } from '@/features/auction-case/types';
import { useSession } from 'next-auth/react';

export function useHasUserBidden(auctionCase?: AuctionCaseLike | null, userId?: string) {
  const session = useSession();
  const criteriaUserId = userId ?? session?.data?.user?.id;

  return getHasBidden(auctionCase, criteriaUserId);
}
