'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import AcceptInvitationHelp from './AcceptInvitation';
import AuctionCaseHelp from './AuctionCase';
import BidHelp from './Bid';
import BidResultHelp from './BidResult';
import GroupHelp from './Group';
import GroupInvitationHelp from './GroupInvitation';
import BidResultChangeHelp from './BidResultChange';

export default function Help() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') ?? 'group';

  const handleTabChange: Parameters<typeof Tabs>[0]['onValueChange'] = (value) => {
    const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
    newSearchParams.set('tab', value);
    const query = newSearchParams.toString();
    const url = `${pathname}?${query}`;
    router.replace(url, { scroll: false });
  };

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
