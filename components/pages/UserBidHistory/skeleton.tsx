'use client';

import List from '@/components/common/List';
import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import UserBidHistoryListItem from './UserBidHistoryListItem';

export default function UserBidHistorySkeleton() {
  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto">
      <PageHeader className="lg:mx-[176px]" title="내 입찰 기록" />
      <PageBody className="py-4 lg:mx-[176px]">
        <List>
          {Array.from(Array(5)).map((n, i) => (
            <UserBidHistoryListItem.Skeleton key={`${n}_${i}`} />
          ))}
        </List>
      </PageBody>
    </div>
  );
}
