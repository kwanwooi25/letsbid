import AuctionCaseForm from '@/components/pages/AuctionCaseForm';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { withAuth } from '@/features/auth/withAuth';
import { getQueryClient } from '@/lib/query';

export default withAuth(async function ({
  params: { groupId, auctionCaseId },
}: {
  params: { groupId: string; auctionCaseId: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));

  return <AuctionCaseForm groupId={groupId} auctionCaseId={auctionCaseId} />;
});
