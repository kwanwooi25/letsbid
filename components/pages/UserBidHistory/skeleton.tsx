'use client';

import List from '@/components/List';
import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import UserBidHistoryListItem from './UserBidHistoryListItem';

export default function UserBidHistorySkeleton() {
  return (
    <>
      <PageHeader className="max-w-lg" title="내 입찰 기록" />
      <PageBody className="max-w-lg">
        <List>
          {Array.from(Array(5)).map((n, i) => (
            <UserBidHistoryListItem.Skeleton key={`${n}_${i}`} />
          ))}
        </List>
      </PageBody>
    </>
  );
}
