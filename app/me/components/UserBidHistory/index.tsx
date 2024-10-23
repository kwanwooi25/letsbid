'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
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
    <>
      <PageHeader className="max-w-lg" title="내 입찰 기록" />
      <PageBody className="max-w-lg">
        <ul className="flex flex-col gap-4 py-4">
          {bidHistory.map((bid) => (
            <UserBidHistoryListItem key={bid.id} bid={bid} />
          ))}
        </ul>
      </PageBody>
    </>
  );
}
