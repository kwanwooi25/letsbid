import BidRankBadge from '@/components/BidRankBadge';
import MeBadge from '@/components/MeBadge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useFormDialog } from '@/context/FormDialog';
import { cn } from '@/lib/utils';
import { BidWithUser } from '@/types/bid';
import { LucideScrollText, LucideUserX } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function AuctionResultItem({ bid, rank, isGroupHost, openBidDetail }: Props) {
  const { openForm } = useFormDialog();
  const session = useSession();
  const { user, biddingPrice, isExcluded, excludedReason } = bid;
  const isMe = session?.data?.user?.id === user?.id;

  const handleClickExcludeBid = () => {
    openForm({
      type: 'BID_EXCLUSION',
      formProps: { bid },
    });
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="self-start md:self-center flex items-center gap-2">
        <BidRankBadge className="shrink-0" rank={rank} isExcluded={isExcluded} />
        <span
          className={cn(
            'line-clamp-1',
            rank && rank <= 2 && 'text-primary/80',
            isExcluded && 'text-gray-500 line-through',
          )}
        >
          {user?.name}
        </span>
        {isMe && <MeBadge />}
      </div>
      <div className="relative self-end flex flex-col items-end md:flex-row md:items-center gap-2 md:gap-3">
        {!!excludedReason && (
          <span className="absolute top-[-14px] left-[-42px] rotate-[-5deg] text-yellow-600 font-semibold">
            {excludedReason}
          </span>
        )}
        <span
          className={cn(
            'text-lg font-bold',
            rank === 1 && 'text-red-500',
            rank === 2 && 'text-orange-500',
            isExcluded && 'text-gray-500 line-through',
          )}
        >
          {biddingPrice?.toLocaleString()}
        </span>
        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" onClick={openBidDetail}>
                <LucideScrollText />
              </Button>
            </TooltipTrigger>
            <TooltipContent>입찰표 보기</TooltipContent>
          </Tooltip>
          {isGroupHost && (
            <Button size="icon" variant="ghost" onClick={handleClickExcludeBid}>
              <LucideUserX />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

type Props = {
  bid: BidWithUser;
  rank: number;
  isGroupHost?: boolean;
  openBidDetail: () => void;
};
