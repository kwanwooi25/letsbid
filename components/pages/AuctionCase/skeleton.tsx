'use client';

import PageBody from '@/components/layouts/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ArticleListSkeleton from './Articles/skeleton';
import AuctionCaseTitle from './AuctionCaseTitle';
import AuctionCaseIntroductionSkeleton from './Introduction/skeleton';
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
        <TabsContent value="articles" className="py-4 mt-0 lg:py-0">
          <ArticleListSkeleton />
        </TabsContent>
      </PageBody>
    </Tabs>
  );
}
