'use client';

import HostBadge from '@/components/HostBadge';
import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PATHS } from '@/const/paths';
import { useIsGroupHost } from '@/hooks/useIsGroupHost';
import { useTabs } from '@/hooks/useTabs';
import { getAuctionCaseListQueryOptions } from '@/queries/auction-case/query';
import { getGroupDetailQueryOptions } from '@/queries/group/query';
import { useSuspenseQueries } from '@tanstack/react-query';
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

  const handleClickBackButton = () => router.replace(PATHS.HOME);

  return (
    <>
      <PageHeader
        className="max-w-2xl"
        backButton
        onBackButtonClick={handleClickBackButton}
        title={
          <>
            <span className="text-xl font-semibold">{group.name}</span>
            {isGroupHost && <HostBadge />}
          </>
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
            <AuctionCaseList isGroupHost={isGroupHost} auctionCases={auctionCases} />
          </TabsContent>
          <TabsContent value="members">
            <MemberList group={group} />
          </TabsContent>
        </Tabs>
      </PageBody>
    </>
  );
}
