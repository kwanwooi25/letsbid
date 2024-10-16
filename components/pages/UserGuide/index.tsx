'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTabs } from '@/hooks/useTabs';
import AcceptInvitationGuide from './AcceptInvitation';
import AuctionCaseGuide from './AuctionCase';
import BidGuide from './Bid';
import BidResultGuide from './BidResult';
import BidResultChangeGuide from './BidResultChange';
import GroupGuide from './Group';
import GroupInvitationGuide from './GroupInvitation';

export default function UserGuide() {
  const { tab, handleTabChange } = useTabs<'group' | 'auctionCase' | 'bid'>({
    defaultTab: 'group',
  });

  return (
    <>
      <PageHeader title="이용 가이드" className="max-w-3xl mx-auto" />
      <PageBody className="max-w-3xl mx-auto">
        <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange}>
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
            <GroupGuide />
            <GroupInvitationGuide />
            <AcceptInvitationGuide />
          </TabsContent>
          <TabsContent value="auctionCase">
            <AuctionCaseGuide />
          </TabsContent>
          <TabsContent value="bid">
            <BidGuide />
            <BidResultGuide />
            <BidResultChangeGuide />
          </TabsContent>
        </Tabs>
      </PageBody>
    </>
  );
}
