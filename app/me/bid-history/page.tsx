import UserBidHistory from '@/components/pages/UserBidHistory';
import { withAuth } from '@/features/auth/withAuth';
import { Suspense } from 'react';
import UserBidHistorySkeleton from './loading';

export default withAuth(function () {
  return (
    <Suspense fallback={<UserBidHistorySkeleton />}>
      <UserBidHistory />
    </Suspense>
  );
});
