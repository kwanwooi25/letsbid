import ArticleForm from '@/components/pages/ArticleForm';
import ArticleFormSkeleton from '@/components/pages/ArticleForm/skeleton';
import { getArticleDetailQueryOptions } from '@/features/article/query';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { withAuth } from '@/features/auth/withAuth';
import { getAppName } from '@/lib/env';
import { getQueryClient } from '@/lib/query';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: { auctionCaseId: string; articleId: string };
}): Promise<Metadata> {
  const queryClient = getQueryClient();
  const [auctionCase, article] = await Promise.all([
    queryClient.fetchQuery(getAuctionCaseDetailQueryOptions(params.auctionCaseId)),
    queryClient.fetchQuery(getArticleDetailQueryOptions(params.articleId)),
  ]);

  if (!auctionCase || !article) {
    return {
      title: `조사 내용 수정 | ${getAppName()}`,
    };
  }

  return {
    title: `조사 내용 수정 | ${article.title} | ${auctionCase.caseName} | ${getAppName()}`,
    description: article.contentHtml,
  };
}

export default withAuth(async function ({
  params: { auctionCaseId, articleId },
}: {
  params: { auctionCaseId: string; articleId: string };
}) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));
  void queryClient.prefetchQuery(getArticleDetailQueryOptions(articleId));

  return (
    <Suspense fallback={<ArticleFormSkeleton />}>
      <ArticleForm auctionCaseId={auctionCaseId} articleId={articleId} />
    </Suspense>
  );
});
