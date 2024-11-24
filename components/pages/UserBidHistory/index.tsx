'use client';

import List from '@/components/common/List';
import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { getMyBidHistoryQueryOptions } from '@/features/bid/query';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { useSuspenseQuery } from '@tanstack/react-query';
import UserBidHistoryListItem from './UserBidHistoryListItem';

export default function UserBidHistory() {
  const { loggedInUser } = useLoggedInUser();
  const { data: bidHistory } = useSuspenseQuery(getMyBidHistoryQueryOptions(loggedInUser?.id));

  if (!loggedInUser) return null;

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
