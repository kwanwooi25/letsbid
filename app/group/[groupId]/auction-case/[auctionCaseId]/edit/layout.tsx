import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { getFullAddress } from '@/features/auction-case/utils';
import { getAppName } from '@/lib/env';
import { getQueryClient } from '@/lib/query';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { groupId: string; auctionCaseId: string };
}): Promise<Metadata> {
  const queryClient = getQueryClient();
  const auctionCase = await queryClient.fetchQuery(
    getAuctionCaseDetailQueryOptions(params.auctionCaseId),
  );

  if (!auctionCase) {
    return {
      title: `경매 사건 수정 | ${getAppName()}`,
    };
  }

  return {
    title: `경매 사건 수정 | ${auctionCase.caseName} | ${getAppName()}`,
    description: getFullAddress(auctionCase),
  };
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
