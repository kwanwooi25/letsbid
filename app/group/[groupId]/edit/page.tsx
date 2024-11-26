import GroupForm from '@/components/pages/GroupForm';
import GroupFormSkeleton from '@/components/pages/GroupForm/skeleton';
import { withAuth } from '@/features/auth/withAuth';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { getAppName } from '@/lib/env';
import { getQueryClient } from '@/lib/query';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: { groupId: string };
}): Promise<Metadata> {
  const queryClient = getQueryClient();
  const group = await queryClient.fetchQuery(getGroupDetailQueryOptions(params.groupId));

  return {
    title: `그룹 수정 | ${group.name} | ${getAppName()}`,
    description: group.description,
  };
}

export default withAuth(function () {
  return (
    <Suspense fallback={<GroupFormSkeleton />}>
      <GroupForm />
    </Suspense>
  );
});
