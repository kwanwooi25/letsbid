'use client';

import List from '@/components/common/List';
import Pagination from '@/components/common/Pagination';
import { useCurrentPage } from '@/components/common/Pagination/useCurrentPage';
import { getGroupMemberListQueryOptions } from '@/features/group/query';
import { useCalibrateCurrentPage } from '@/hooks/useCalibrateCurrentPage';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import MemberListItem from './ListItem';

export default function MemberList({ groupHostId }: Props) {
  const params = useParams();
  const groupId = params.groupId as string;
  const { currentPage } = useCurrentPage();
  const { data } = useSuspenseQuery(getGroupMemberListQueryOptions(groupId, { page: currentPage }));
  const { data: groupMembers, meta } = data;

  useCalibrateCurrentPage(!groupMembers.length);

  return (
    <>
      <List>
        {groupMembers.map((member) => (
          <MemberListItem key={member.userId} member={member} groupHostId={groupHostId} />
        ))}
      </List>
      {typeof meta?.totalPages === 'number' && meta.totalPages > 1 && (
        <Pagination lastPage={meta.totalPages} />
      )}
    </>
  );
}

type Props = {
  groupHostId?: string;
};
