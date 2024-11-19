'use client';

import List from '@/components/List';
import ListEmpty from '@/components/ListEmpty';
import Pagination from '@/components/Pagination';
import { useCurrentPage } from '@/components/Pagination/useCurrentPage';
import { Button } from '@/components/ui/button';
import { getJoinedGroupListQueryOptions } from '@/features/group/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useGroupListRouter } from '../useGroupListRouter';
import GroupListItem from './GroupListItem';

export default function JoinedGroupList() {
  const { currentPage, setCurrentPage } = useCurrentPage();
  const session = useSession();
  const userId = session.data?.user?.id;
  const { moveToJoinableGroupList } = useGroupListRouter();

  const { data, isPending } = useSuspenseQuery(
    getJoinedGroupListQueryOptions({ page: currentPage }),
  );
  const { data: groups, meta } = data;

  useEffect(() => {
    if (currentPage > 1 && !groups.length) {
      setCurrentPage(1);
    }
  }, [currentPage, groups.length, setCurrentPage]);

  if (!isPending && !groups.length) {
    return (
      <ListEmpty className="flex flex-col gap-4 py-8">
        <p>참여중인 그룹이 없습니다</p>
        <p>
          <Button type="button" onClick={moveToJoinableGroupList}>
            참여 가능한 그룹
          </Button>
          <span className="ml-2">에서 그룹을 찾아보세요.</span>
        </p>
      </ListEmpty>
    );
  }

  return (
    <>
      <List>
        {groups.map((group) => (
          <GroupListItem key={group.id} group={group} isHost={userId === group.hostId} />
        ))}
      </List>
      {typeof meta?.totalPages === 'number' && meta.totalPages > 0 && (
        <Pagination lastPage={meta.totalPages} />
      )}
    </>
  );
}
