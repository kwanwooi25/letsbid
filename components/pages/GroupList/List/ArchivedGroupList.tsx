'use client';

import List from '@/components/List';
import ListEmpty from '@/components/ListEmpty';
import { getArchivedGroupListQueryOptions } from '@/queries/group/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import GroupListItem from './GroupListItem';

export default function ArchivedGroupList() {
  const session = useSession();
  const userId = session.data?.user?.id;
  const { data: groups, isPending } = useSuspenseQuery(getArchivedGroupListQueryOptions);

  if (!isPending && !groups.length) {
    return <ListEmpty className="flex flex-col gap-4 py-8">숨겨진 그룹이 없습니다</ListEmpty>;
  }

  return (
    <List>
      {groups.map((group) => (
        <GroupListItem key={group.id} group={group} isHost={userId === group.hostId} />
      ))}
    </List>
  );
}