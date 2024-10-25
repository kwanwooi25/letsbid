import AuctionCaseForm from '@/app/group/[groupId]/auction-case/components/AuctionCaseForm';
import { withAuth } from '@/lib/auth/hoc';
import { getAuctionCaseDetailQueryOptions } from '@/queries/auction-case/query';
import { getQueryClient } from '@/queries/config';

export default withAuth(async function ({
  params: { groupId, auctionCaseId },
}: {
  params: { groupId: string; auctionCaseId: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));

  return <AuctionCaseForm groupId={groupId} auctionCaseId={auctionCaseId} />;
});
