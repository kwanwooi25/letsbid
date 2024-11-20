'use client';

import List from '@/components/common/List';
import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { getMyBidHistoryQueryOptions } from '@/features/bid/query';
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
        <List>
          {bidHistory.map((bid) => (
            <UserBidHistoryListItem key={bid.id} bid={bid} />
          ))}
        </List>
      </PageBody>
    </>
  );
}
