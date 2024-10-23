import UserBidHistory from '@/app/me/components/UserBidHistory';
import { withAuth } from '@/lib/auth/hoc';
import { Suspense } from 'react';
import UserBidHistorySkeleton from '../components/UserBidHistory/skeleton';

export default withAuth(function () {
  return (
    <Suspense fallback={<UserBidHistorySkeleton />}>
      <UserBidHistory />
    </Suspense>
  );
});
