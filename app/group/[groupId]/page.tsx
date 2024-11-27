import NeedToJoinGroup from '@/components/pages/GroupDetail/NeedToJoin';
import GroupOverCrowded from '@/components/pages/GroupDetail/OverCrowded';
import GroupDetailSkeleton from '@/components/pages/GroupDetail/skeleton';
import { PATHS } from '@/const/paths';
import { auth } from '@/features/auth';
import { withAuth } from '@/features/auth/withAuth';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { getQueryClient } from '@/lib/query';
import dynamic from 'next/dynamic';
import { redirect, RedirectType } from 'next/navigation';
import { Suspense } from 'react';

const GroupDetail = dynamic(() => import('@/components/pages/GroupDetail'), {
  ssr: false,
  loading: () => <GroupDetailSkeleton />,
});

export default withAuth(async function ({ params: { groupId } }: { params: { groupId: string } }) {
  const session = await auth();
  const { user } = session ?? {};
  const queryClient = getQueryClient();
  const group = await queryClient.fetchQuery(getGroupDetailQueryOptions(groupId));

  if (!group || !user) {
    return redirect(PATHS.GROUP, RedirectType.replace);
  }

  // 이미 그룹의 멤버인 경우만 진입 가능
  if (group.members.filter((member) => member.userId === user?.id).length > 0) {
    return (
      <Suspense fallback={<GroupDetailSkeleton />}>
        <GroupDetail />
      </Suspense>
    );
  }

  // 정원 초과
  if (group.members.length >= group.maxMembers) {
    return <GroupOverCrowded />;
  }

  // 아직 그룹 멤버가 아닌 경우
  if (group.members.filter((member) => member.userId === user?.id).length <= 0) {
    return (
      <Suspense fallback={<GroupDetailSkeleton />}>
        <NeedToJoinGroup />
      </Suspense>
    );
  }

  return redirect(PATHS.GROUP, RedirectType.replace);
});
