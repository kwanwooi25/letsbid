import AuctionCaseForm from '@/app/group/[groupId]/auction-case/components/AuctionCaseForm';
import Loading from '@/components/Loading';
import { withAuth } from '@/lib/auth/hoc';
import { Suspense } from 'react';

export default withAuth(function ({ params: { groupId } }: { params: { groupId: string } }) {
  return (
    <Suspense fallback={<Loading size="lg" />}>
      <AuctionCaseForm groupId={groupId} />
    </Suspense>
  );
});
