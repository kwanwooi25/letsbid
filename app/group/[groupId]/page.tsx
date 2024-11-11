import GroupDetail from '@/components/pages/GroupDetail';
import { PATHS } from '@/const/paths';
import { getUserFromSession } from '@/lib/api';
import { withAuth } from '@/lib/auth/hoc';
import { getQueryClient } from '@/queries/config';
import { getGroupDetailQueryOptions } from '@/queries/group/query';
import { redirect, RedirectType } from 'next/navigation';
import { Suspense } from 'react';

export default withAuth(async function ({ params: { groupId } }: { params: { groupId: string } }) {
  try {
    const user = await getUserFromSession();
    const queryClient = getQueryClient();
    const group = await queryClient.fetchQuery(getGroupDetailQueryOptions(groupId));

    // 해당 그룹의 멤버가 아니면 진입할 수 없음
    if (!group || group.members.filter((member) => member.userId === user?.id).length <= 0) {
      return redirect(PATHS.GROUP, RedirectType.replace);
    }

    return (
      <Suspense fallback={<GroupDetail.Skeleton />}>
        <GroupDetail />
      </Suspense>
    );
  } catch (error) {
    return redirect(PATHS.GROUP, RedirectType.replace);
  }
});
