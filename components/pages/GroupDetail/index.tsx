'use client';

import HostBadge from '@/components/common/HostBadge';
import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { getAuctionCaseListQueryOptions } from '@/features/auction-case/query';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { useIsGroupHost } from '@/features/group/useIsGroupHost';
import { formatDateTime } from '@/lib/datetime';
import { useSuspenseQueries } from '@tanstack/react-query';
import { LucideEyeOff } from 'lucide-react';
import { useParams } from 'next/navigation';
import AuctionCaseList from './AuctionCaseList';
import MemberList from './MemberList';
import GroupDetailPageToolbar from './Toolbar';
import { useGroupDetailPageActions } from './useGroupDetailPageActions';
import { useGroupDetailRouter } from './useGroupDetailRouter';
import { useGroupDetailTabs } from './useGroupDetailTabs';

export default function GroupDetail() {
  const params = useParams();
  const groupId = params.groupId as string;
  const [{ data: group }, { data: auctionCases }] = useSuspenseQueries({
    queries: [getGroupDetailQueryOptions(groupId), getAuctionCaseListQueryOptions(groupId)],
  });
  const { isGroupHost } = useIsGroupHost(group.hostId);
  const { tab, handleTabChange } = useGroupDetailTabs();
  const { moveToGroupList, moveToEditGroup } = useGroupDetailRouter();
  const { tryToDeleteGroup, tryToArchiveGroup, tryToUnarchiveGroup, tryToMoveOutFromGroup } =
    useGroupDetailPageActions({ group });

  const isArchived = !!group.archivedAt;

  return (
    <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange}>
      <PageHeader
        className="max-w-2xl"
        backButton
        onBackButtonClick={moveToGroupList}
        title={
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {isArchived && (
                <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 bg-secondary">
                  <LucideEyeOff className="w-4 h-4" />
                </div>
              )}
              <span className="text-xl font-semibold line-clamp-2">{group.name}</span>
              {isGroupHost && <HostBadge />}
            </div>
            {isArchived && (
              <div className="text-xs text-primary/50 font-semibold">
                {formatDateTime(group.archivedAt!, 'yyyy-MM-dd HH:mm에 숨겨짐')}
              </div>
            )}
          </div>
        }
      >
        <div className="flex items-center gap-2">
          {isGroupHost ? (
            <>
              <Button type="button" onClick={moveToEditGroup}>
                수정
              </Button>
              {isArchived ? (
                <Button type="button" variant="destructive-outline" onClick={tryToUnarchiveGroup}>
                  숨김 해제
                </Button>
              ) : (
                <Button type="button" variant="destructive-outline" onClick={tryToArchiveGroup}>
                  숨김
                </Button>
              )}
              <Button type="button" variant="destructive" onClick={tryToDeleteGroup}>
                삭제
              </Button>
            </>
          ) : (
            <Button type="button" variant="destructive" onClick={tryToMoveOutFromGroup}>
              그룹에서 나가기
            </Button>
          )}
        </div>
      </PageHeader>

      <PageBody className="max-w-2xl w-full lg:max-w-5xl lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-4 lg:items-start">
        <GroupDetailPageToolbar group={group} />
        <TabsContent value="auctionCases" className="py-4 mt-0 lg:py-0">
          <AuctionCaseList isGroupHost={isGroupHost} auctionCases={auctionCases} />
        </TabsContent>
        <TabsContent value="members" className="py-4 mt-0 lg:py-0">
          <MemberList group={group} />
        </TabsContent>
      </PageBody>
    </Tabs>
  );
}
