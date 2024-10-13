'use client';

import Loading from '@/components/Loading';
import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabs } from '@/hooks/useTabs';
import { Suspense } from 'react';
import ReceivedInvitationList from './ReceivedInvitationList';
import SentInvitationList from './SentInvitationList';

export default function Invitation() {
  const { tab, handleTabChange } = useTabs<'received' | 'sent'>({ defaultTab: 'received' });

  return (
    <>
      <PageHeader title="그룹 초대 목록" className="max-w-2xl" backButton />
      <PageBody className="max-w-2xl">
        <Tabs defaultValue={tab} onValueChange={handleTabChange}>
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="received">
              받은 초대
            </TabsTrigger>
            <TabsTrigger className="w-full" value="sent">
              보낸 초대
            </TabsTrigger>
          </TabsList>

          <Suspense fallback={<Loading />}>
            <TabsContent value="received">
              <ReceivedInvitationList />
            </TabsContent>
            <TabsContent value="sent">
              <SentInvitationList />
            </TabsContent>
          </Suspense>
        </Tabs>
      </PageBody>
    </>
  );
}
