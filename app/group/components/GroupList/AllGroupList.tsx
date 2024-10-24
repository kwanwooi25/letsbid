'use client';

import ListEmpty from '@/components/ListEmpty';
import { getGroupListQueryOptions } from '@/queries/group/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import GroupListItem from './GroupListItem';

export default function AllGroupList() {
  const session = useSession();
  const userId = session.data?.user?.id;
  const { data: groups, isPending } = useSuspenseQuery(getGroupListQueryOptions);

  if (!isPending && !groups.length) {
    return (
      <ListEmpty className="flex flex-col gap-4 py-8">참여할 수 있는 그룹이 없습니다</ListEmpty>
    );
  }

  return (
    <ul className="flex flex-col gap-4 py-4">
      {groups.map((group) => (
        <GroupListItem key={group.id} group={group} isHost={userId === group.hostId} />
      ))}
    </ul>
  );
}
