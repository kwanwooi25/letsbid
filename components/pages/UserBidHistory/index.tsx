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
    <div className="max-w-2xl lg:max-w-5xl mx-auto">
      <PageHeader className="lg:mx-[176px]" title="내 입찰 기록" />
      <PageBody className="py-4 lg:mx-[176px]">
        <List>
          {bidHistory.map((bid) => (
            <UserBidHistoryListItem key={bid.id} bid={bid} />
          ))}
        </List>
      </PageBody>
    </div>
  );
}
