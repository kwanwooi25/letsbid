import PageBody from '@/components/PageBody';
import { Skeleton } from '@/components/ui/skeleton';
import AuctionCaseIntroductionSkeleton from './AuctionCaseIntroductionSkeleton';

export default function AuctionCaseSkeleton() {
  return (
    <>
      <Skeleton.PageHeader className="max-w-2xl" backButton actionButtonCount={2} />
      <PageBody className="max-w-2xl flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between min-h-[28px]">
          <div className="flex items-center gap-3">
            <Skeleton className="h-[28px] w-[80px] rounded-full" />
            <Skeleton className="h-[20px] w-[170px]" />
          </div>
        </div>
        <AuctionCaseIntroductionSkeleton />
      </PageBody>
    </>
  );
}
