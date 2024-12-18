'use client';

import { AuctionCaseLike } from '@/features/auction-case/types';
import { getHasBidden } from '@/features/auction-case/utils';
import { useLoggedInUser } from '@/hooks';

export function useHasUserBidden(auctionCase?: AuctionCaseLike | null, userId?: string) {
  const { loggedInUser } = useLoggedInUser();
  const criteriaUserId = userId ?? loggedInUser?.id;

  return getHasBidden(auctionCase, criteriaUserId);
}
