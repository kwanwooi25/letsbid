import { getGroupDetailQueryOptions } from '@/features/group/query';
import { getAppName } from '@/lib/env';
import { getQueryClient } from '@/lib/query';
import { createSearchParams } from '@/lib/url';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { groupId: string };
}): Promise<Metadata> {
  const queryClient = getQueryClient();
  const group = await queryClient.fetchQuery(getGroupDetailQueryOptions(params.groupId));

  const { name, description } = group;

  const searchParams = createSearchParams({ title: name, description });
  const imagePath = `/api/image/og?${searchParams.toString()}`;

  return {
    title: `${name} | ${getAppName()}`,
    description,
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
