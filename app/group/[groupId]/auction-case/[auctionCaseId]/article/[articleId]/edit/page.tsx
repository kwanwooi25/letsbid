import ArticleForm from '@/components/pages/ArticleForm';
import ArticleFormSkeleton from '@/components/pages/ArticleForm/skeleton';
import { withAuth } from '@/lib/auth/hoc';
import { getArticleDetailQueryOptions } from '@/queries/article/query';
import { getAuctionCaseDetailQueryOptions } from '@/queries/auction-case/query';
import { getQueryClient } from '@/queries/config';
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
