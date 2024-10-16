import AuctionCase from '@/app/group/[groupId]/auction-case/components/AuctionCase';
import Loading from '@/components/Loading';
import { withAuth } from '@/lib/auth/hoc';
import { Suspense } from 'react';

export default withAuth(function () {
  return (
    <Suspense fallback={<Loading size="lg" />}>
      <AuctionCase />
    </Suspense>
  );
});
