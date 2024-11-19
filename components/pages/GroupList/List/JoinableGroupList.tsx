'use client';

import List from '@/components/common/List';
import ListEmpty from '@/components/common/ListEmpty';
import Pagination from '@/components/common/Pagination';
import { useCurrentPage } from '@/components/common/Pagination/useCurrentPage';
import { getJoinableGroupListQueryOptions } from '@/features/group/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import GroupListItem from './GroupListItem';

export default function JoinableGroupList() {
  const { currentPage, setCurrentPage } = useCurrentPage();
  const session = useSession();
  const userId = session.data?.user?.id;
  const { data, isPending } = useSuspenseQuery(
    getJoinableGroupListQueryOptions({ page: currentPage }),
  );
  const { data: groups, meta } = data;

  useEffect(() => {
    if (currentPage > 1 && !groups.length) {
      setCurrentPage(1);
    }
  }, [currentPage, groups.length, setCurrentPage]);

  if (!isPending && !groups.length) {
    return (
      <ListEmpty className="flex flex-col gap-4 py-8">참여할 수 있는 그룹이 없습니다</ListEmpty>
    );
  }

  return (
    <>
      <List>
        {groups.map((group) => (
          <GroupListItem key={group.id} group={group} isHost={userId === group.hostId} />
        ))}
      </List>
      {typeof meta?.totalPages === 'number' && meta.totalPages > 1 && (
        <Pagination lastPage={meta.totalPages} />
      )}
    </>
  );
}
