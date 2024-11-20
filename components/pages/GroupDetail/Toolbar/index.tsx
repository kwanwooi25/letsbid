'use client';

import PageToolbar from '@/components/layouts/PageToolbar';
import { Button } from '@/components/ui/button';
import { GroupWithMembers } from '@/features/group/types';
import { useIsGroupHost } from '@/features/group/useIsGroupHost';
import { LucideFilePlus2 } from 'lucide-react';
import { useGroupDetailRouter } from '../useGroupDetailRouter';
import { useGroupDetailTabs } from '../useGroupDetailTabs';
import GroupDetailTabsList from './GroupDetailTabsList';

export default function GroupDetailPageToolbar({ group }: Props) {
  const { tab } = useGroupDetailTabs();
  const { moveToCreateAuctionCase } = useGroupDetailRouter();
  const { isGroupHost } = useIsGroupHost(group?.hostId);
  const isArchived = !!group?.archivedAt;

  return (
    <PageToolbar className="flex items-center gap-4">
      <GroupDetailTabsList />
      {isGroupHost && !isArchived && tab === 'auctionCases' && (
        <Button className="lg:w-full" onClick={moveToCreateAuctionCase}>
          <LucideFilePlus2 className="w-4 h-4 mr-2" />
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
