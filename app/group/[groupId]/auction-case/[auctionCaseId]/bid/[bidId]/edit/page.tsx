import Loading from '@/components/Loading';
import BiddingForm from '@/components/pages/BiddingForm';
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
  const auctionCase = await queryClient.fetchQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));
  const bid = await queryClient.fetchQuery(getBidDetailQueryOptions(bidId));

  return (
    <Suspense fallback={<Loading fullscreen />}>
      <BiddingForm auctionCase={auctionCase} bid={bid} />
    </Suspense>
  );
});
