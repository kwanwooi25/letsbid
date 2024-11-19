import BiddingForm from '@/components/pages/BiddingForm';
import BiddingFormSkeleton from '@/components/pages/BiddingForm/skeleton';
import { withAuth } from '@/features/auth/hoc';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { getQueryClient } from '@/lib/query';
import { Suspense } from 'react';

export default withAuth(async function ({
  params: { auctionCaseId },
}: {
  params: { auctionCaseId: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));

  return (
    <Suspense fallback={<BiddingFormSkeleton />}>
      <BiddingForm auctionCaseId={auctionCaseId} />
    </Suspense>
  );
});
