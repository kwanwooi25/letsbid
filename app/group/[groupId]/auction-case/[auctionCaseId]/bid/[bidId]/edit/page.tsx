import BiddingForm from '@/components/pages/BiddingForm';
import BiddingFormSkeleton from '@/components/pages/BiddingForm/skeleton';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { getFullAddress } from '@/features/auction-case/utils';
import { withAuth } from '@/features/auth/withAuth';
import { getBidDetailQueryOptions } from '@/features/bid/query';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { getAppName } from '@/lib/env';
import { getQueryClient } from '@/lib/query';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: { groupId: string; auctionCaseId: string };
}): Promise<Metadata> {
  const queryClient = getQueryClient();
  const [group, auctionCase] = await Promise.all([
    queryClient.fetchQuery(getGroupDetailQueryOptions(params.groupId)),
    queryClient.fetchQuery(getAuctionCaseDetailQueryOptions(params.auctionCaseId)),
  ]);

  if (!auctionCase) {
    return {
      title: `입찰서 수정 | ${group.name} | ${getAppName()}`,
      description: group.description,
    };
  }

  return {
    title: `입찰서 수정 | ${auctionCase.caseName} | ${group.name} | ${getAppName()}`,
    description: getFullAddress(auctionCase),
  };
}

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
