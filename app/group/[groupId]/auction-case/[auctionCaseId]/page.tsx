import AuctionCase from '@/components/pages/AuctionCase';
import AuctionCaseSkeleton from '@/components/pages/AuctionCase/skeleton';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { getFullAddress } from '@/features/auction-case/utils';
import { withAuth } from '@/features/auth/withAuth';
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
      title: `${group.name} | ${getAppName()}`,
      description: group.description,
    };
  }

  return {
    title: `${auctionCase.caseName} | ${group.name} | ${getAppName()}`,
    description: getFullAddress(auctionCase),
  };
}

export default withAuth(function () {
  return (
    <Suspense fallback={<AuctionCaseSkeleton />}>
      <AuctionCase />
    </Suspense>
  );
});
