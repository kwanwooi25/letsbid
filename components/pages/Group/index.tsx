'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PATHS } from '@/const/paths';
import { useIsGroupHost } from '@/hooks/useIsGroupHost';
import { getAuctionCaseListQueryOptions } from '@/queries/auction-case/query';
import { getGroupDetailQueryOptions } from '@/queries/group/query';
import { useSuspenseQueries } from '@tanstack/react-query';
import { LucideCrown } from 'lucide-react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import AuctionCaseList from './AuctionCaseList';
import GroupDetailHeaderButtons from './HeaderButtons';
import MemberList from './MemberList';
import { GroupPageTabs } from './types';

export default function Group() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const groupId = params.groupId as string;
  const tab = (searchParams.get('tab') as GroupPageTabs) ?? 'auctionCases';
  const [{ data: group }, { data: auctionCases }] = useSuspenseQueries({
    queries: [getGroupDetailQueryOptions(groupId), getAuctionCaseListQueryOptions(groupId)],
  });
  const { isGroupHost } = useIsGroupHost(group.hostId);

  const handleClickBackButton = () => router.replace(PATHS.HOME);

  const handleTabChange: Parameters<typeof Tabs>[0]['onValueChange'] = (value) => {
    const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
    newSearchParams.set('tab', value);
    const query = newSearchParams.toString();
    const url = `${pathname}?${query}`;
    router.replace(url);
  };

  return (
    <>
      <PageHeader
        className="max-w-2xl"
        backButton
        onBackButtonClick={handleClickBackButton}
        title={
          <>
            <span className="text-xl font-semibold">{group.name}</span>
            {isGroupHost && (
              <Avatar>
                <AvatarFallback>
                  <LucideCrown className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </>
        }
      >
        {isGroupHost && <GroupDetailHeaderButtons group={group} />}
      </PageHeader>
      <PageBody className="max-w-2xl">
        <Tabs defaultValue={tab} onValueChange={handleTabChange}>
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
            <MemberList isGroupHost={isGroupHost} group={group} />
          </TabsContent>
        </Tabs>
      </PageBody>
    </>
  );
}
