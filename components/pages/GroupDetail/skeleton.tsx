import PageBody from '@/components/layouts/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import AuctionCaseListSkeleton from './AuctionCaseList/skeleton';
import MemberListSkeleton from './MemberList/skeleton';
import GroupDetailPageToolbarSkeleton from './Toolbar/skeleton';

export default function GroupDetailSkeleton() {
  return (
    <Tabs>
      <Skeleton.PageHeader className="max-w-2xl" backButton actionButtonCount={2} />
      <PageBody className="max-w-2xl w-full pt-0 lg:max-w-5xl lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-4 lg:items-start">
        <div className="bg-background -mx-4 px-4 pt-1 pb-4 sticky top-[180px] sm:top-[132px]">
          <GroupDetailPageToolbarSkeleton />
          <Skeleton className="h-[40px] w-full mt-4 lg:hidden" />
        </div>
        <div>
          <Skeleton className="h-[40px] w-full hidden lg:flex pt-1 pb-4 sticky top-[132px] bg-background" />
          <TabsContent value="auctionCases" className="py-0 mt-0">
            <AuctionCaseListSkeleton />
          </TabsContent>
          <TabsContent value="members" className="py-0 mt-0">
            <MemberListSkeleton />
          </TabsContent>
        </div>
      </PageBody>
    </Tabs>
  );
}
