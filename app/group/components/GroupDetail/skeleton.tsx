import PageBody from '@/components/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function GroupDetailSkeleton() {
  return (
    <>
      <Skeleton.PageHeader className="max-w-2xl" backButton actionButtonCount={2} />
      <PageBody className="max-w-2xl">
        <Tabs>
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="auctionCases">
              경매 사건
            </TabsTrigger>
            <TabsTrigger className="w-full" value="members">
              멤버
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </PageBody>
    </>
  );
}
