import BiddingForm from '@/components/pages/BiddingForm';
import BiddingFormSkeleton from '@/components/pages/BiddingForm/skeleton';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { withAuth } from '@/features/auth/withAuth';
import { getBidDetailQueryOptions } from '@/features/bid/query';
import { getQueryClient } from '@/lib/query';
import { Suspense } from 'react';

export default withAuth(async function ({
  params: { auctionCaseId, bidId },
}: {
  params: { auctionCaseId: string; bidId: string };
}) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));
  void queryClient.prefetchQuery(getBidDetailQueryOptions(bidId));

  return (
    <Suspense fallback={<BiddingFormSkeleton />}>
      <BiddingForm auctionCaseId={auctionCaseId} bidId={bidId} />
    </Suspense>
  );
});
