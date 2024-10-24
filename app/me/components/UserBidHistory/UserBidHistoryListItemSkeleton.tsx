import BidRankBadge from '@/components/BidRankBadge';
import ListItem from '@/components/ListItem';
import { Skeleton } from '@/components/ui/skeleton';

export default function UserBidHistoryListItemSkeleton() {
  return (
    <ListItem className="relative">
      <BidRankBadge className="absolute top-0 left-0 translate-x-[-15%] translate-y-[-30%]" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-[24px] w-[90px]" />
        <Skeleton className="h-[20px] w-[180px]" />
      </div>
      <div className="flex flex-col items-end justify-start gap-2">
        <Skeleton className="h-[28px] w-[110px]" />
      </div>
    </ListItem>
  );
}
