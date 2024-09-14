'use client';

import { groupListQueryOptions } from '@/queries/group/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import GroupListItem from './GroupListItem';

export default function GroupList() {
  const session = useSession();
  const userId = session.data?.user?.id;
  const { data } = useSuspenseQuery(groupListQueryOptions);

  return (
    <ul className="flex flex-col gap-4">
      {data.map((group) => (
        <GroupListItem key={group.id} group={group} isHost={userId === group.hostId} />
      ))}
    </ul>
  );
}
