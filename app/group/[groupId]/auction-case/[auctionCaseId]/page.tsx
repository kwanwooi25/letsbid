import AuctionCase from '@/components/pages/AuctionCase';
import AuctionCaseSkeleton from '@/components/pages/AuctionCase/skeleton';
import { withAuth } from '@/features/auth/hoc';
import { Suspense } from 'react';

export default withAuth(function () {
  return (
    <Suspense fallback={<AuctionCaseSkeleton />}>
      <AuctionCase />
    </Suspense>
  );
});
