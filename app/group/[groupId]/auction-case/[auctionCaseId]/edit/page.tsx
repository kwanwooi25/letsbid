import Loading from '@/components/Loading';
import AuctionCaseForm from '@/components/pages/AuctionCaseForm';
import { withAuth } from '@/lib/auth/hoc';
import { getAuctionCaseDetailQueryOptions } from '@/queries/auction-case/query';
import { getQueryClient } from '@/queries/config';
import { Suspense } from 'react';

export default withAuth(async function ({
  params: { groupId, auctionCaseId },
}: {
  params: { groupId: string; auctionCaseId: string };
}) {
  const queryClient = getQueryClient();
  const auctionCase = await queryClient.fetchQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));

  return (
    <Suspense fallback={<Loading size="lg" />}>
      <AuctionCaseForm groupId={groupId} auctionCase={auctionCase} />
    </Suspense>
  );
});
