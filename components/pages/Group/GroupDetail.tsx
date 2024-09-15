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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import GroupDetailHeaderButtons from './HeaderButtons';
import MemberList from './MemberList';

export default function GroupDetail({ groupId, tab = 'cases' }: Props) {
  const session = useSession();
  const { data: group } = useSuspenseQuery(getGroupDetailQueryOptions(groupId));
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
            <TabsTrigger className="w-full" value="cases">
              사건
            </TabsTrigger>
            <TabsTrigger className="w-full" value="members">
              멤버
            </TabsTrigger>
          </TabsList>
          <TabsContent value="cases" className="flex flex-col gap-6">
            <span>입찰 중 사건</span>
            <span>입찰 예정 사건</span>
            <span>입찰 종료 사건</span>
          </TabsContent>
          <TabsContent value="members">
            <MemberList group={group} />
          </TabsContent>
        </Tabs>
      </PageBody>
    </>
  );
}

type Props = {
  groupId: string;
  tab: 'cases' | 'members';
};
