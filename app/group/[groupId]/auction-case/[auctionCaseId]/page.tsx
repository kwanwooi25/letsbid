import AuctionCase from '@/components/pages/AuctionCase';
import { withAuth } from '@/lib/auth/hoc';
import { Suspense } from 'react';

export default withAuth(function () {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuctionCase />
    </Suspense>
  );
});