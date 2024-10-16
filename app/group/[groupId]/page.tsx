import Loading from '@/components/Loading';
import GroupDetail from '@/components/pages/GroupDetail';
import { PATHS } from '@/const/paths';
import { withAuth } from '@/lib/auth/hoc';
import { getQueryClient } from '@/queries/config';
import { getGroupDetailQueryOptions } from '@/queries/group/query';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default withAuth(async function ({ params: { groupId } }: { params: { groupId: string } }) {
  try {
    const queryClient = getQueryClient();
    const group = await queryClient.fetchQuery(getGroupDetailQueryOptions(groupId));

    if (!group) return redirect(PATHS.HOME);

    return (
      <Suspense fallback={<Loading size="lg" />}>
        <GroupDetail />
      </Suspense>
    );
  } catch (error) {
    return redirect(PATHS.HOME);
  }
});
