import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { getFullAddress } from '@/features/auction-case/utils';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { getAppName } from '@/lib/env';
import { getQueryClient } from '@/lib/query';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { groupId: string; auctionCaseId: string };
}): Promise<Metadata> {
  const queryClient = getQueryClient();
  const [group, auctionCase] = await Promise.all([
    queryClient.fetchQuery(getGroupDetailQueryOptions(params.groupId)),
    queryClient.fetchQuery(getAuctionCaseDetailQueryOptions(params.auctionCaseId)),
  ]);

  if (!auctionCase) {
    return {
      title: `경매 사건 상세 | ${group.name} | ${getAppName()}`,
      description: group.description,
    };
  }

  return {
    title: `${auctionCase.caseName} | ${group.name} | ${getAppName()}`,
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
