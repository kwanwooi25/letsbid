import ListItem from '@/components/common/ListItem';
import UserImage from '@/components/common/UserImage';
import { Skeleton } from '@/components/ui/skeleton';

export default function ArticleListItemSkeleton() {
  return (
    <ListItem className="flex-col">
      <div className="w-full flex items-center justify-between gap-4">
        <Skeleton className="h-[24px] sm:h-[28px] w-[100px]" />

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Skeleton className="h-[16px] w-[16px] rounded-full" />
            <Skeleton className="h-[20px] w-[15px]" />
          </div>
          <div className="mt-auto flex items-center gap-2">
            <UserImage size={24} />
            <Skeleton className="h-[16px] sm:h-[20px] w-[40px]" />
          </div>
        </div>
      </div>

      <div className="w-full flex items-center gap-4">
        <div className="flex flex-col gap-2 flex-1 items-start">
          <Skeleton className="h-[16px] sm:h-[20px] w-[200px]" />
          <Skeleton className="h-[16px] sm:h-[20px] w-[80px]" />
        </div>

        <Skeleton.Button icon />
      </div>
    </ListItem>
  );
}
