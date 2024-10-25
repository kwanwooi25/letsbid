import BiddingForm from '@/app/group/[groupId]/auction-case/components/BiddingForm';
import BiddingFormSkeleton from '@/app/group/[groupId]/auction-case/components/BiddingForm/skeleton';
import { withAuth } from '@/lib/auth/hoc';
import { getAuctionCaseDetailQueryOptions } from '@/queries/auction-case/query';
import { getBidDetailQueryOptions } from '@/queries/bid/query';
import { getQueryClient } from '@/queries/config';
import { Suspense } from 'react';

export default withAuth(async function ({
  params: { auctionCaseId, bidId },
}: {
  params: { auctionCaseId: string; bidId: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));
  await queryClient.prefetchQuery(getBidDetailQueryOptions(bidId));

  return (
    <Suspense fallback={<BiddingFormSkeleton />}>
      <BiddingForm auctionCaseId={auctionCaseId} bidId={bidId} />
    </Suspense>
  );
});
