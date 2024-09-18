'use client';

import { getHasBidden } from '@/lib/auctionCase';
import { AuctionCaseLike } from '@/types/auctionCase';
import { useSession } from 'next-auth/react';

export function useHasUserBidden(auctionCase: AuctionCaseLike, userId?: string) {
  const session = useSession();
  const criteriaUserId = userId ?? session?.data?.user?.id;

  return getHasBidden(auctionCase, criteriaUserId);
}
