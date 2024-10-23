'use client';

import ListItem from '@/components/ListItem';
import { Skeleton } from '@/components/ui/skeleton';

export default function GroupListItemSkeleton() {
  return (
    <ListItem className="min-h-[86px] hover:cursor-default">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-[28px] w-[100px]" />
        <div className="flex items-center gap-2 min-h-[20px]">
          <Skeleton className="h-[20px] w-[60px]" />
          <Skeleton className="w-[20px] h-[20px] rounded-full" />
        </div>
      </div>
    </ListItem>
  );
}
