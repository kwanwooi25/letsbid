import DetailRow from '@/components/DetailRow';
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
      <Skeleton className="w-full h-[50vw]" />
    </div>
  );
}
