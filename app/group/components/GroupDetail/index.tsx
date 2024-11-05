'use client';

import HostBadge from '@/components/HostBadge';
import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PATHS } from '@/const/paths';
import { useIsGroupHost } from '@/hooks/useIsGroupHost';
import { useTabs } from '@/hooks/useTabs';
import { formatDateTime } from '@/lib/datetime';
import { getAuctionCaseListQueryOptions } from '@/queries/auction-case/query';
import { getGroupDetailQueryOptions } from '@/queries/group/query';
import { useSuspenseQueries } from '@tanstack/react-query';
import { LucideEyeOff } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import AuctionCaseList from './AuctionCaseList';
import GroupDetailHeaderButtons from './HeaderButtons';
import MemberList from './MemberList';
import { GroupPageTabs } from './types';

export default function GroupDetail() {
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;
  const [{ data: group }, { data: auctionCases }] = useSuspenseQueries({
    queries: [getGroupDetailQueryOptions(groupId), getAuctionCaseListQueryOptions(groupId)],
  });
  const { isGroupHost } = useIsGroupHost(group.hostId);
  const { tab, handleTabChange } = useTabs<GroupPageTabs>({ defaultTab: 'auctionCases' });

  const isArchived = !!group.archivedAt;

  const handleClickBackButton = () => router.replace(PATHS.HOME);

  return (
    <>
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
      <PageBody className="max-w-2xl">
        <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange}>
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="auctionCases">
              경매 사건
            </TabsTrigger>
            <TabsTrigger className="w-full" value="members">
              멤버
            </TabsTrigger>
          </TabsList>
          <TabsContent value="auctionCases">
            <AuctionCaseList
              isGroupHost={isGroupHost}
              isArchived={isArchived}
              auctionCases={auctionCases}
            />
          </TabsContent>
          <TabsContent value="members">
            <MemberList group={group} />
          </TabsContent>
        </Tabs>
      </PageBody>
    </>
  );
}
