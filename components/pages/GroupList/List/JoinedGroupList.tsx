'use client';

import List from '@/components/common/List';
import ListEmpty from '@/components/common/ListEmpty';
import Pagination from '@/components/common/Pagination';
import { useCurrentPage } from '@/components/common/Pagination/useCurrentPage';
import { useSearchInput } from '@/components/common/SearchInput/useSearchInput';
import { Button } from '@/components/ui/button';
import { getJoinedGroupListQueryOptions } from '@/features/group/query';
import { useCalibrateCurrentPage } from '@/hooks/useCalibrateCurrentPage';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useGroupListTabs } from '../useGroupListTabs';
import GroupListItem from './GroupListItem';

export default function JoinedGroupList() {
  const { currentPage } = useCurrentPage();
  const { search } = useSearchInput();
  const { handleTabChange } = useGroupListTabs();

  const { data, isPending } = useSuspenseQuery(
    getJoinedGroupListQueryOptions({ page: currentPage, search }),
  );
  const { data: groups, meta } = data;

  useCalibrateCurrentPage(!groups.length);

  if (!isPending && !groups.length) {
    return (
      <ListEmpty className="flex flex-col gap-4 py-8">
        <p>참여중인 그룹이 없습니다</p>
        <p>
          <Button type="button" onClick={() => handleTabChange('joinable')}>
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
          <GroupListItem key={group.id} group={group} />
        ))}
      </List>
      {typeof meta?.totalPages === 'number' && meta.totalPages > 1 && (
        <Pagination lastPage={meta.totalPages} />
      )}
    </>
  );
}
