'use client';

import PageBody from '@/components/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import AuctionCaseIntroductionSkeleton from './Introduction/skeleton';
import AuctionCaseTitle from './AuctionCaseTitle';
import AucitonCasePageToolbarSkeleton from './Toolbar/skeleton';
import { useAuctionCaseDetailTabs } from './useAuctionCaseDetailTabs';

export default function AuctionCaseSkeleton() {
  const { tab } = useAuctionCaseDetailTabs();

  return (
    <Tabs value={tab}>
      <Skeleton.PageHeader
        title={<AuctionCaseTitle.Skeleton />}
        className="max-w-2xl min-h-[80px]"
        backButton
        actionButtonCount={2}
      />
      <PageBody className="max-w-2xl flex flex-col gap-4 lg:max-w-5xl lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-8 lg:items-start">
        <AucitonCasePageToolbarSkeleton />
        <TabsContent value="introduction" className="py-4 mt-0 lg:py-0">
          <AuctionCaseIntroductionSkeleton />
        </TabsContent>
      </PageBody>
    </Tabs>
  );
}
