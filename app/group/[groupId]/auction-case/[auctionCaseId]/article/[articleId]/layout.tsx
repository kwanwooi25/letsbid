import { getArticleDetailQueryOptions } from '@/features/article/query';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { getAppName } from '@/lib/env';
import { getQueryClient } from '@/lib/query';
import { Metadata } from 'next';

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

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
