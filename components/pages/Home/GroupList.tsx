'use client';

import ListEmpty from '@/components/ListEmpty';
import { Button } from '@/components/ui/button';
import { groupListQueryOptions } from '@/queries/group/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import GroupListItem from './GroupListItem';
import { useHomeHeaderButtons } from './useHomeHeaderButtons';

export default function GroupList() {
  const session = useSession();
  const userId = session.data?.user?.id;
  const { data: groups, isPending } = useSuspenseQuery(groupListQueryOptions);

  const { moveToInvitations, openCreateGroupForm } = useHomeHeaderButtons();

  if (!isPending && !groups.length) {
    return (
      <ListEmpty className="flex flex-col gap-4">
        <p className="mb-4">내가 속한 그룹이 없습니다</p>
        <p>
          <Button type="button" onClick={openCreateGroupForm}>
            그룹 생성
          </Button>
          <span className="ml-2">또는</span>
        </p>
        <p>
          <Button type="button" variant="secondary" onClick={moveToInvitations}>
            초대 목록 보기
          </Button>
          <span className="ml-2">를 통해 그룹에 참여하세요.</span>
        </p>
      </ListEmpty>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {groups.map((group) => (
        <GroupListItem key={group.id} group={group} isHost={userId === group.hostId} />
      ))}
    </ul>
  );
}
