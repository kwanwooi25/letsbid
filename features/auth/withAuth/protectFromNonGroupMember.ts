import { PATHS } from '@/const/paths';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { getQueryClient } from '@/lib/query';
import { Session } from 'next-auth';
import { headers } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';
import { appendCallbackUrl } from './appendCallbackUrl';

export async function protectFromNonGroupMember({ session }: Args) {
  const headerList = headers();
  const pathname = headerList.get('x-url-pathname');

  const [, rootPath, groupId, childPath] = pathname?.split('/') ?? [];

  if (rootPath !== 'group') return;

  const queryClient = getQueryClient();
  const group = await queryClient.fetchQuery(getGroupDetailQueryOptions(groupId));

  if (!groupId) return;

  if (!!groupId && groupId !== 'create' && !group)
    return redirect(PATHS.GROUP, RedirectType.replace);

  const isGroupMember = !!group.members.find((member) => member.userId === session?.user?.id);

  // 그룹 멤버인지 확인
  if (!!childPath && !isGroupMember) {
    const redirectUrl = appendCallbackUrl(`${PATHS.GROUP}/${groupId}`);

    return redirect(redirectUrl, RedirectType.replace);
  }

  // 최소 회원 등급 이상인지 확인
  const isAboveMinimumUserRole = !!session?.user && group.userRoles.includes(session.user.role);

  if (!!childPath && !isAboveMinimumUserRole) {
    const redirectUrl = `${PATHS.GROUP}/${groupId}`;

    return redirect(redirectUrl, RedirectType.replace);
  }
}

type Args = {
  session?: Session | null;
};
