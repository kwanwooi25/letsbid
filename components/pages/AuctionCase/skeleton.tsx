import PageBody from '@/components/layouts/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ArticleListSkeleton from './Articles/skeleton';
import AuctionCaseTitle from './AuctionCaseTitle';
import AuctionCaseIntroductionSkeleton from './Introduction/skeleton';
import AucitonCasePageToolbarSkeleton from './Toolbar/skeleton';

export default function AuctionCaseSkeleton() {
  return (
    <Tabs className="max-w-2xl lg:max-w-5xl mx-auto">
      <Skeleton.PageHeader
        title={<AuctionCaseTitle.Skeleton />}
        className="max-w-2xl min-h-[80px] lg:mx-[176px]"
        backButton
        actionButtonCount={1}
        actionButtonType="icon"
      />
      <PageBody className="w-full pt-0 lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-4 lg:items-start">
        <div className="bg-background -mx-4 px-4 pt-1 pb-4 sticky z-header top-[140px] lg:mx-0 lg:px-0">
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
