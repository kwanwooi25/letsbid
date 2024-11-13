'use client';

import HostBadge from '@/components/HostBadge';
import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import PageToolbar from '@/components/PageToolbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PATHS } from '@/const/paths';
import { useIsGroupHost } from '@/hooks/useIsGroupHost';
import { formatDateTime } from '@/lib/datetime';
import { getAuctionCaseListQueryOptions } from '@/queries/auction-case/query';
import { getGroupDetailQueryOptions } from '@/queries/group/query';
import { useSuspenseQueries } from '@tanstack/react-query';
import { LucideEyeOff, LucideFilePlus2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import AuctionCaseList from './AuctionCaseList';
import GroupDetailTabsList from './GroupDetailTabsList';
import GroupDetailHeaderButtons from './HeaderButtons';
import MemberList from './MemberList';
import { useGroupDetailTabs } from './useGroupDetailTabs';

export default function GroupDetail() {
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;
  const [{ data: group }, { data: auctionCases }] = useSuspenseQueries({
    queries: [getGroupDetailQueryOptions(groupId), getAuctionCaseListQueryOptions(groupId)],
  });
  const { isGroupHost } = useIsGroupHost(group.hostId);
  const { tab, handleTabChange } = useGroupDetailTabs();

  const isArchived = !!group.archivedAt;

  const handleClickBackButton = () => router.replace(PATHS.HOME);

  const handleClickAddCase = () => {
    router.push(`${PATHS.GROUP}/${groupId}${PATHS.CREATE_AUCTION_CASE}`);
  };

  return (
    <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange}>
      <PageHeader
        className="max-w-2xl"
        backButton
        onBackButtonClick={handleClickBackButton}
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
        <GroupDetailHeaderButtons group={group} />
      </PageHeader>
      <PageBody className="max-w-2xl w-full lg:max-w-5xl lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-4 lg:items-start">
        <PageToolbar className="flex items-center gap-4">
          <GroupDetailTabsList />
          {isGroupHost && !isArchived && tab === 'auctionCases' && (
            <Button className="lg:w-full" onClick={handleClickAddCase}>
              <LucideFilePlus2 className="w-4 h-4 mr-2" />
              경매 사건 추가
            </Button>
          )}
          {tab === 'members' && (
            <span className="shrink-0">
              전체 멤버수:{' '}
              <b className="text-lg font-bold">{group.members.length.toLocaleString()}</b>명
            </span>
          )}
        </PageToolbar>
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
