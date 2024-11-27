import { getArticleDetailQueryOptions } from '@/features/article/query';
import { getAppName } from '@/lib/env';
import { getQueryClient } from '@/lib/query';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { auctionCaseId: string; articleId: string };
}): Promise<Metadata> {
  const queryClient = getQueryClient();
  const article = await queryClient.fetchQuery(getArticleDetailQueryOptions(params.articleId));

  if (!article) {
    return {
      title: `조사 내용 수정 | ${getAppName()}`,
    };
  }

  return {
    title: `조사 내용 수정 | ${article.title} | ${getAppName()}`,
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
