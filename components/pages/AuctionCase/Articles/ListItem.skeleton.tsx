'use client';

import ListItem from '@/components/common/ListItem';
import { Skeleton } from '@/components/ui/skeleton';
import UserImage from '@/components/common/UserImage';

export default function ArticleListItemSkeleton() {
  return (
    <ListItem className="min-h-[98px] sm:min-h-[114px]">
      <div className="flex flex-col gap-2 flex-1 items-start">
        <Skeleton className="h-[24px] sm:h-[28px] w-[100px]" />
        <Skeleton className="h-[16px] sm:h-[20px] w-[200px]" />
        <Skeleton className="h-[16px] sm:h-[20px] w-[80px]" />
      </div>
      <div className="flex items-center gap-2 self-end">
        <UserImage size={24} />
        <Skeleton className="h-[16px] sm:h-[20px] w-[40px]" />
      </div>
    </ListItem>
  );
}
