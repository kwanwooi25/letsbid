import { getUserFromSession } from '@/app/api/utils';
import GroupDetailSkeleton from '@/components/pages/GroupDetail/skeleton';
import { PATHS } from '@/const/paths';
import { withAuth } from '@/features/auth/hoc';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { getQueryClient } from '@/lib/query';
import dynamic from 'next/dynamic';
import { redirect, RedirectType } from 'next/navigation';
import { Suspense } from 'react';

const GroupDetail = dynamic(() => import('@/components/pages/GroupDetail'), { ssr: false });

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
      <Suspense fallback={<GroupDetailSkeleton />}>
        <GroupDetail />
      </Suspense>
    );
  } catch (error) {
    return redirect(PATHS.GROUP, RedirectType.replace);
  }
});
