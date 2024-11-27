import ArticleForm from '@/components/pages/ArticleForm';
import ArticleFormSkeleton from '@/components/pages/ArticleForm/skeleton';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { withAuth } from '@/features/auth/withAuth';
import { getQueryClient } from '@/lib/query';
import { Suspense } from 'react';

export default withAuth(async function ({
  params: { auctionCaseId },
}: {
  params: { auctionCaseId: string };
}) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));

  return (
    <Suspense fallback={<ArticleFormSkeleton />}>
      <ArticleForm auctionCaseId={auctionCaseId} />
    </Suspense>
  );
});
