import Loading from '@/components/Loading';
import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Suspense } from 'react';
import UserBidHistoryList from './UserBidHistoryList';

export default function UserBidHistory() {
  return (
    <>
      <PageHeader className="max-w-lg" title="내 입찰 기록">
        {/* <UserProfileHeaderButtons /> */}
      </PageHeader>
      <PageBody className="max-w-lg">
        <Suspense fallback={<Loading />}>
          <UserBidHistoryList />
        </Suspense>
      </PageBody>
    </>
  );
}
