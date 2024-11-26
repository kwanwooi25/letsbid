import ArticleDetailSkeleton from '@/components/pages/ArticleDetail/skeleton';
import { getArticleDetailQueryOptions } from '@/features/article/query';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { withAuth } from '@/features/auth/withAuth';
import { getAppName } from '@/lib/env';
import { getQueryClient } from '@/lib/query';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ArticleDetail = dynamic(() => import('@/components/pages/ArticleDetail'), {
  ssr: false,
  loading: () => <ArticleDetailSkeleton />,
});

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
      title: getAppName(),
    };
  }

  return {
    title: `${article.title} | ${auctionCase.caseName} | ${getAppName()}`,
    description: article.contentHtml,
  };
}

export default withAuth(function () {
  return (
    <Suspense fallback={<ArticleDetailSkeleton />}>
      <ArticleDetail />
    </Suspense>
  );
});
