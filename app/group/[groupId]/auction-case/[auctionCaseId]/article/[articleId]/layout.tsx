import { getArticleDetailQueryOptions } from '@/features/article/query';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { getAppName } from '@/lib/env';
import { getQueryClient } from '@/lib/query';
import { createSearchParams } from '@/lib/url';
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

  const { caseName } = auctionCase;
  const { title, contentHtml } = article;

  const searchParams = createSearchParams({ title: title, description: caseName });
  const imagePath = `/api/image/og?${searchParams.toString()}`;

  return {
    title: `${title} | ${caseName} | ${getAppName()}`,
    description: contentHtml,
    openGraph: {
      images: imagePath,
    },
    twitter: {
      images: imagePath,
    },
  };
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
