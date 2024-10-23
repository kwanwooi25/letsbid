import BiddingForm from '@/app/group/[groupId]/auction-case/components/BiddingForm';
import BiddingFormSkeleton from '@/app/group/[groupId]/auction-case/components/BiddingForm/skeleton';
import { withAuth } from '@/lib/auth/hoc';
import { getAuctionCaseDetailQueryOptions } from '@/queries/auction-case/query';
import { getQueryClient } from '@/queries/config';
import { Suspense } from 'react';

export default withAuth(async function ({
  params: { auctionCaseId },
}: {
  params: { auctionCaseId: string };
}) {
  const queryClient = getQueryClient();
  const auctionCase = await queryClient.fetchQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));

  return (
    <Suspense fallback={<BiddingFormSkeleton />}>
      <BiddingForm auctionCase={auctionCase} />
    </Suspense>
  );
});
