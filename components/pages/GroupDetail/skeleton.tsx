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
      <PageBody className="max-w-2xl w-full lg:max-w-5xl lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-4 lg:items-start">
        <GroupDetailPageToolbarSkeleton />
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
