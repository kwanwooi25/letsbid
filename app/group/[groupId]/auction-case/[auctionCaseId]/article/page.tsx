import ArticleForm from '@/components/pages/ArticleForm';
import ArticleFormSkeleton from '@/components/pages/ArticleForm/skeleton';
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
  await queryClient.prefetchQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));

  return (
    <Suspense fallback={<ArticleFormSkeleton />}>
      <ArticleForm auctionCaseId={auctionCaseId} />
    </Suspense>
  );
});
