import AuctionCase from '@/app/group/[groupId]/auction-case/components/AuctionCase';

import { withAuth } from '@/lib/auth/hoc';
import { Suspense } from 'react';
import AuctionCaseSkeleton from '../components/AuctionCase/skeleton';

export default withAuth(function () {
  return (
    <Suspense fallback={<AuctionCaseSkeleton />}>
      <AuctionCase />
    </Suspense>
  );
});
