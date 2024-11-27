import { withAuth } from '@/features/auth/withAuth';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import UserBidHistorySkeleton from './loading';

const UserBidHistory = dynamic(() => import('@/components/pages/UserBidHistory'), {
  ssr: false,
  loading: () => <UserBidHistorySkeleton />,
});

export default withAuth(function () {
  return (
    <Suspense fallback={<UserBidHistorySkeleton />}>
      <UserBidHistory />
    </Suspense>
  );
});
