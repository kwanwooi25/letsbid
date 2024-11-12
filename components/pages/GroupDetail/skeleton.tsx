'use client';

import PageBody from '@/components/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import AuctionCaseListSkeleton from './AuctionCaseListSkeleton';
import GroupDetailTabsList from './GroupDetailTabsList';
import MemberListSkeleton from './MemberListSkeleton';
import { useGroupDetailTabs } from './useGroupDetailTabs';

export default function GroupDetailSkeleton() {
  const { tab } = useGroupDetailTabs();

  return (
    <Tabs value={tab}>
      <Skeleton.PageHeader className="max-w-2xl" backButton actionButtonCount={2} />
      <PageBody className="max-w-2xl w-full lg:max-w-5xl lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-4 lg:items-start">
        <GroupDetailTabsList />
        <TabsContent value="auctionCases" className="py-4 mt-0 lg:py-0">
          <AuctionCaseListSkeleton />
        </TabsContent>
        <TabsContent value="members" className="py-4 mt-0 lg:py-0">
          <MemberListSkeleton />
        </TabsContent>
      </PageBody>
    </Tabs>
  );
}
