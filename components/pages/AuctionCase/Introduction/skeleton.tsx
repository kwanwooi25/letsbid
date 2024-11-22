import DetailRow from '@/components/common/DetailRow';
import Divider from '@/components/ui/divider';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuctionCaseIntroductionSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 w-full sm:flex-row">
        <div className="flex flex-col gap-4 w-full">
          <DetailRow.Skeleton />
          <DetailRow.Skeleton />
          <DetailRow.Skeleton />
          <DetailRow.Skeleton />
        </div>
        <Divider className="hidden sm:block" direction="vertical" />
        <div className="flex flex-col gap-4 w-full">
          <DetailRow.Skeleton />
          <DetailRow.Skeleton />
          <DetailRow.Skeleton />
          <DetailRow.Skeleton />
        </div>
      </div>
      <Divider />
      <div className="flex items-center h-[80px] py-1 -mx-4 px-4 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-7 sm:h-auto gap-3">
        <Skeleton className="w-[72px] sm:w-full h-full" />
        <Skeleton className="w-[72px] sm:w-full h-full" />
        <Skeleton className="w-[72px] sm:w-full h-full" />
        <Skeleton className="w-[72px] sm:w-full h-full" />
      </div>
      <Skeleton className="w-full h-[50vw]" />
    </div>
  );
}
