'use client';

import List from '@/components/common/List';
import ListEmpty from '@/components/common/ListEmpty';
import Pagination from '@/components/common/Pagination';
import { useCurrentPage } from '@/components/common/Pagination/useCurrentPage';
import { useSearchInput } from '@/components/common/SearchInput/useSearchInput';
import { getJoinableGroupListQueryOptions } from '@/features/group/query';
import { useCalibrateCurrentPage } from '@/hooks/useCalibrateCurrentPage';
import { useSuspenseQuery } from '@tanstack/react-query';
import GroupListItem from './GroupListItem';

export default function JoinableGroupList() {
  const { currentPage } = useCurrentPage();
  const { search } = useSearchInput();
  const { data, isPending } = useSuspenseQuery(
    getJoinableGroupListQueryOptions({ page: currentPage, search }),
  );
  const { data: groups, meta } = data;

  useCalibrateCurrentPage(!groups.length);

  if (!isPending && !groups.length) {
    return (
      <ListEmpty className="flex flex-col gap-4 py-8">참여할 수 있는 그룹이 없습니다</ListEmpty>
    );
  }

  return (
    <>
      <List>
        {groups.map((group) => (
          <GroupListItem key={group.id} group={group} />
        ))}
      </List>
      {typeof meta?.totalPages === 'number' && meta.totalPages > 1 && (
        <Pagination lastPage={meta.totalPages} />
      )}
    </>
  );
}
