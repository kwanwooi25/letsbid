'use client';

import ListItem from '@/components/common/ListItem';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuctionCaseListItemSkeleton() {
  return (
    <ListItem className="min-h-[82px] sm:min-h-[94px] hover:cursor-default">
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-[28px] w-[70px] rounded-full" />
        <Skeleton className="h-[24px] sm:h-[28px] w-[100px]" />
        <Skeleton className="h-[16px] sm:h-[20px] w-[200px]" />
      </div>

      <div className="flex flex-col gap-1 justify-between items-end text-right shrink-0">
        <Skeleton className="h-[24px] sm:h-[28px] w-[70px]" />
        <Skeleton className="h-[20px] sm:h-[24px] md:h-[28px] w-[120px]" />
      </div>
    </ListItem>
  );
}
