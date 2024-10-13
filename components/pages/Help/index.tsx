'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabs } from '@/hooks/useTabs';
import AcceptInvitationHelp from './AcceptInvitation';
import AuctionCaseHelp from './AuctionCase';
import BidHelp from './Bid';
import BidResultHelp from './BidResult';
import BidResultChangeHelp from './BidResultChange';
import GroupHelp from './Group';
import GroupInvitationHelp from './GroupInvitation';

export default function Help() {
  const { tab, handleTabChange } = useTabs<'group' | 'auctionCase' | 'bid'>({
    defaultTab: 'group',
  });

  return (
    <>
      <PageHeader title="이용 가이드" className="max-w-3xl mx-auto" />
      <PageBody className="max-w-3xl mx-auto">
        <Tabs defaultValue={tab} onValueChange={handleTabChange}>
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="group">
              그룹
            </TabsTrigger>
            <TabsTrigger className="w-full" value="auctionCase">
              경매 사건
            </TabsTrigger>
            <TabsTrigger className="w-full" value="bid">
              입찰
            </TabsTrigger>
          </TabsList>

          <TabsContent value="group">
            <GroupHelp />
            <GroupInvitationHelp />
            <AcceptInvitationHelp />
          </TabsContent>
          <TabsContent value="auctionCase">
            <AuctionCaseHelp />
          </TabsContent>
          <TabsContent value="bid">
            <BidHelp />
            <BidResultHelp />
            <BidResultChangeHelp />
          </TabsContent>
        </Tabs>
      </PageBody>
    </>
  );
}
