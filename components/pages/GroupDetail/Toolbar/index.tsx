'use client';

import PageToolbar from '@/components/layouts/PageToolbar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useAuctionCaseRouter } from '@/features/auction-case/useAuctionCaseRouter';
import { GroupWithMembers } from '@/features/group/types';
import { useIsGroupMember } from '@/features/group/useIsGroupMember';
import { useGroupDetailTabs } from '../useGroupDetailTabs';
import GroupDetailTabsList from './GroupDetailTabsList';

export default function GroupDetailPageToolbar({ group }: Props) {
  const { tab } = useGroupDetailTabs();
  const { moveToCreateAuctionCase } = useAuctionCaseRouter();
  const { isGroupHost, isViceGroupHost } = useIsGroupMember(group);
  const isArchived = !!group?.archivedAt;

  return (
    <PageToolbar className="flex items-center gap-4">
      <GroupDetailTabsList />
      {(isGroupHost || isViceGroupHost) && !isArchived && tab === 'auctionCases' && (
        <Button className="lg:w-full" onClick={() => moveToCreateAuctionCase(group?.id)}>
          <Icon name="file-plus-2" className="w-4 h-4 mr-2" />
          경매 사건 추가
        </Button>
      )}
      {tab === 'members' && (
        <span className="shrink-0">
          전체 멤버수: <b className="text-lg font-bold">{group?.members.length.toLocaleString()}</b>
          명
        </span>
      )}
    </PageToolbar>
  );
}

type Props = {
  group?: GroupWithMembers;
};
