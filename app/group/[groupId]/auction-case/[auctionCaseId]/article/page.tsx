import ArticleForm from '@/components/pages/ArticleForm';
import ArticleFormSkeleton from '@/components/pages/ArticleForm/skeleton';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { getFullAddress } from '@/features/auction-case/utils';
import { withAuth } from '@/features/auth/withAuth';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { getAppName } from '@/lib/env';
import { getQueryClient } from '@/lib/query';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: { groupId: string; auctionCaseId: string };
}): Promise<Metadata> {
  const queryClient = getQueryClient();
  const group = await queryClient.fetchQuery(getGroupDetailQueryOptions(params.groupId));
  const auctionCase = await queryClient.fetchQuery(
    getAuctionCaseDetailQueryOptions(params.auctionCaseId),
  );

  if (!auctionCase) {
    return {
      title: `조사 내용 등록 | ${group.name} | ${getAppName()}`,
      description: group.description,
    };
  }

  return {
    title: `조사 내용 등록 | ${auctionCase.caseName} | ${group.name} | ${getAppName()}`,
    description: getFullAddress(auctionCase),
  };
}

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
