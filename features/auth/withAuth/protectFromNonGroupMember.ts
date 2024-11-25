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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, rootPath, groupId, childPath] = pathname?.split('/') ?? [];

  if (rootPath !== 'group') return;

  const queryClient = getQueryClient();
  const group = await queryClient.fetchQuery(getGroupDetailQueryOptions(groupId));

  if (!!groupId && groupId !== 'create' && !group)
    return redirect(PATHS.GROUP, RedirectType.replace);

  if (
    !!childPath &&
    group.members.filter((member) => member.userId === session?.user?.id).length <= 0
  ) {
    const redirectUrl = appendCallbackUrl(`${PATHS.GROUP}/${groupId}`);

    return redirect(redirectUrl, RedirectType.replace);
  }
}

type Args = {
  session?: Session | null;
};
