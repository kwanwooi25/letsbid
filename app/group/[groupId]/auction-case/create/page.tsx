import AuctionCaseForm from '@/components/pages/AuctionCaseForm';
import { withAuth } from '@/features/auth/withAuth';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { getAppName } from '@/lib/env';
import { getQueryClient } from '@/lib/query';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { groupId: string };
}): Promise<Metadata> {
  const queryClient = getQueryClient();
  const group = await queryClient.fetchQuery(getGroupDetailQueryOptions(params.groupId));

  return {
    title: `경매 사건 추가 | ${group.name} | ${getAppName()}`,
    description: group.description,
  };
}

export default withAuth(function ({ params: { groupId } }: { params: { groupId: string } }) {
  return <AuctionCaseForm groupId={groupId} />;
});
