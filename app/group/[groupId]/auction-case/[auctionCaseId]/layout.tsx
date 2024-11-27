import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { getFullAddress } from '@/features/auction-case/utils';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { getAppName } from '@/lib/env';
import { getQueryClient } from '@/lib/query';
import { createSearchParams } from '@/lib/url';
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

  const { name, description } = group;

  if (!auctionCase) {
    return {
      title: `경매 사건 상세 | ${name} | ${getAppName()}`,
      description,
    };
  }

  const { caseName } = auctionCase;
  const fullAddress = getFullAddress(auctionCase);

  const searchParams = createSearchParams({ title: name, description: fullAddress });
  const imagePath = `/api/image/og?${searchParams.toString()}`;

  return {
    title: `${caseName} | ${name} | ${getAppName()}`,
    description: getFullAddress(auctionCase),
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
