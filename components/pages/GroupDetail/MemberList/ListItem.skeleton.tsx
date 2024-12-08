'use client';

import ListItem from '@/components/common/ListItem';
import UserImage from '@/components/common/UserImage';
import { Skeleton } from '@/components/ui/skeleton';

export default function MemberListItemSkeleton() {
  return (
    <ListItem className="hover:cursor-default">
      <div className="flex items-center gap-2">
        <UserImage size={40} />
        <Skeleton className="h-[24px] sm:h-[28px] w-[100px]" />
      </div>
    </ListItem>
  );
}
