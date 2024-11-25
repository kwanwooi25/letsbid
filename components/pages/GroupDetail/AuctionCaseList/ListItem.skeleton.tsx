import ListItem from '@/components/common/ListItem';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuctionCaseListItemSkeleton() {
  return (
    <ListItem className="flex-col">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-[28px] w-[70px] rounded-full" />
          <Skeleton className="h-[24px] w-[90px]" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-[24px] w-[35px]" />
          <Skeleton className="h-[24px] w-[35px]" />
        </div>
      </div>

      <div className="w-full flex items-center gap-4">
        <div className="flex flex-col gap-1 flex-1 items-start">
          <Skeleton className="h-[24px] sm:h-[28px] w-[100px]" />
          <Skeleton className="h-[16px] sm:h-[20px] w-[200px]" />
        </div>

        <Skeleton.Button icon />
      </div>
    </ListItem>
  );
}
