import ArticleForm from '@/components/pages/ArticleForm';
import ArticleFormSkeleton from '@/components/pages/ArticleForm/skeleton';
import { getArticleDetailQueryOptions } from '@/features/article/query';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { withAuth } from '@/features/auth/hoc';
import { getQueryClient } from '@/lib/query';
import { Suspense } from 'react';

export default withAuth(async function ({
  params: { auctionCaseId, articleId },
}: {
  params: { auctionCaseId: string; articleId: string };
}) {
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(getAuctionCaseDetailQueryOptions(auctionCaseId)),
    queryClient.prefetchQuery(getArticleDetailQueryOptions(articleId)),
  ]);

  return (
    <Suspense fallback={<ArticleFormSkeleton />}>
      <ArticleForm auctionCaseId={auctionCaseId} articleId={articleId} />
    </Suspense>
  );
});
