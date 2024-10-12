import Loading from '@/components/Loading';
import AuctionCaseForm from '@/components/pages/AuctionCaseForm';
import { withAuth } from '@/lib/auth/hoc';
import { Suspense } from 'react';

export default withAuth(function () {
  return (
    <Suspense fallback={<Loading size="lg" />}>
      <AuctionCaseForm />
    </Suspense>
  );
});
