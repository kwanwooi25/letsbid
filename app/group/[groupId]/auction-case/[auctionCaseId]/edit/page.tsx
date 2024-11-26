import AuctionCaseForm from '@/components/pages/AuctionCaseForm';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { getFullAddress } from '@/features/auction-case/utils';
import { withAuth } from '@/features/auth/withAuth';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { getAppName } from '@/lib/env';
import { getQueryClient } from '@/lib/query';
import { Metadata } from 'next';

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
      title: `경매 사건 수정 | ${group.name} | ${getAppName()}`,
      description: group.description,
    };
  }

  return {
    title: `경매 사건 수정 | ${auctionCase.caseName} | ${group.name} | ${getAppName()}`,
    description: getFullAddress(auctionCase),
  };
}

export default withAuth(async function ({
  params: { groupId, auctionCaseId },
}: {
  params: { groupId: string; auctionCaseId: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));

  return <AuctionCaseForm groupId={groupId} auctionCaseId={auctionCaseId} />;
});
