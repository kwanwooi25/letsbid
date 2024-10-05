'use client';

import { getMyBidHistoryQueryOptions } from '@/queries/bid/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import UserBidHistoryListItem from './UserBidHistoryListItem';

export default function UserBidHistoryList() {
  const session = useSession();
  const { data: bidHistory } = useSuspenseQuery(getMyBidHistoryQueryOptions());

  if (!session?.data?.user) return null;

  return (
    <div>
      {bidHistory.map((bid) => (
        <UserBidHistoryListItem key={bid.id} bid={bid} />
      ))}
    </div>
  );
}
