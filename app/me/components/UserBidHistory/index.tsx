'use client';

import { getMyBidHistoryQueryOptions } from '@/queries/bid/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import UserBidHistoryListItem from './UserBidHistoryListItem';

export default function UserBidHistory() {
  const session = useSession();
  const { data: bidHistory } = useSuspenseQuery(
    getMyBidHistoryQueryOptions(session?.data?.user?.id),
  );

  if (!session?.data?.user) return null;

  return (
    <ul className="flex flex-col gap-4">
      {bidHistory.map((bid) => (
        <UserBidHistoryListItem key={bid.id} bid={bid} />
      ))}
    </ul>
  );
}
