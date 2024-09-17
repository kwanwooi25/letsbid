'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PATHS } from '@/const/paths';
import { getGroupDetailQueryOptions } from '@/queries/group/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LucideCrown } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AuctionCaseList from './AuctionCaseList';
import GroupDetailHeaderButtons from './HeaderButtons';
import MemberList from './MemberList';
import { GroupPageTabs } from './types';

export default function Group() {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const groupId = params.groupId as string;
  const tab = (searchParams.get('tab') as GroupPageTabs) ?? 'auctionCases';
  const { data: group } = useSuspenseQuery(getGroupDetailQueryOptions(groupId));
  const isHost = session?.data?.user?.id === group.hostId;

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
            {isHost && (
              <Avatar>
                <AvatarFallback>
                  <LucideCrown className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </>
        }
      >
        <GroupDetailHeaderButtons isHost={isHost} group={group} />
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
            <Suspense fallback={<div>Loading...</div>}>
              <AuctionCaseList isHost={isHost} />
            </Suspense>
          </TabsContent>
          <TabsContent value="members">
            <MemberList isHost={isHost} group={group} />
          </TabsContent>
        </Tabs>
      </PageBody>
    </>
  );
}
