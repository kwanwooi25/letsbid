'use client';

import ListEmpty from '@/components/ListEmpty';
import { Button } from '@/components/ui/button';
import { getMyGroupListQueryOptions } from '@/queries/group/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import GroupListItem from './GroupListItem';
import { useGroupTabs } from './useGroupTabs';

export default function MyGroupList() {
  const session = useSession();
  const userId = session.data?.user?.id;
  const { data: groups, isPending } = useSuspenseQuery(getMyGroupListQueryOptions);
  const { handleTabChange } = useGroupTabs();

  const moveToGroupList = () => handleTabChange('all');

  if (!isPending && !groups.length) {
    return (
      <ListEmpty className="flex flex-col gap-4 py-8">
        <p>참여중인 그룹이 없습니다</p>
        <p>
          <Button type="button" onClick={moveToGroupList}>
            참여 가능한 그룹
          </Button>
          <span className="ml-2">에서 그룹을 찾아보세요.</span>
        </p>
      </ListEmpty>
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
