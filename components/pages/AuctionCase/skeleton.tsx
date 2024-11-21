import PageBody from '@/components/layouts/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ArticleListSkeleton from './Articles/skeleton';
import AuctionCaseTitle from './AuctionCaseTitle';
import AuctionCaseIntroductionSkeleton from './Introduction/skeleton';
import AucitonCasePageToolbarSkeleton from './Toolbar/skeleton';
import { AUCTION_CASE_DETAIL_TABS } from './useAuctionCaseDetailTabs';

export default function AuctionCaseSkeleton() {
  return (
    <Tabs value={AUCTION_CASE_DETAIL_TABS[0]}>
      <Skeleton.PageHeader
        title={<AuctionCaseTitle.Skeleton />}
        className="max-w-2xl min-h-[80px]"
        backButton
        actionButtonCount={2}
      />
      <PageBody className="max-w-2xl pt-0 lg:max-w-5xl lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-8 lg:items-start">
        <div className="bg-background -mx-4 px-4 pt-1 pb-4 sticky z-header top-[140px]">
          <AucitonCasePageToolbarSkeleton />
        </div>
        <div className="pt-1">
          <TabsContent value="introduction" className="mt-0 py-0">
            <AuctionCaseIntroductionSkeleton />
          </TabsContent>
          <TabsContent value="articles" className="mt-0 py-0">
            <ArticleListSkeleton />
          </TabsContent>
        </div>
      </PageBody>
    </Tabs>
  );
}
