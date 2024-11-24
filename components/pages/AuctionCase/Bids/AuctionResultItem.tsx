import BidRankBadge from '@/components/common/BidRankBadge';
import MeBadge from '@/components/common/MeBadge';
import WithTooltip from '@/components/common/WithTooltip';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { AuctionCaseLike } from '@/features/auction-case/types';
import { BidWithUser } from '@/features/bid/types';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { cn } from '@/lib/utils';
import { LucideScrollText, LucideUserPlus, LucideUserX } from 'lucide-react';
import { useAuctionCaseDetailActions } from '../useAuctionCaseDetailActions';

export default function AuctionResultItem({
  auctionCase,
  bid,
  rank,
  actualRank,
  isGroupHost,
  isViceGroupHost,
  openBidDetail,
}: Props) {
  const { user, biddingPrice, isExcluded, excludedReason } = bid;
  const { loggedInUser } = useLoggedInUser();
  const isMe = loggedInUser?.id === user?.id;

  const { tryToExcludeBid, tryToIncludeBid, tryToGiveUpBid } = useAuctionCaseDetailActions({
    auctionCase,
  });

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative self-start md:self-center flex items-center gap-2">
        {actualRank <= 2 && !isExcluded && (
          <BidRankBadge className="absolute top-[-75%] left-[32px]" rank={actualRank} />
        )}
        <Chip variant="secondary" size="sm" icon>
          {rank}
        </Chip>
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
          <WithTooltip tooltip="입찰표 보기">
            <Button size="icon" variant="ghost" onClick={openBidDetail}>
              <LucideScrollText />
            </Button>
          </WithTooltip>
          {(isGroupHost || isViceGroupHost) && !isExcluded && (
            <WithTooltip tooltip="입찰 제외 처리">
              <Button size="icon" variant="ghost" onClick={() => tryToExcludeBid(bid)}>
                <LucideUserX />
              </Button>
            </WithTooltip>
          )}
          {isExcluded && (isGroupHost || isViceGroupHost || isMe) && (
            <WithTooltip tooltip="입찰 참여 처리">
              <Button size="icon" variant="ghost" onClick={() => tryToIncludeBid(bid)}>
                <LucideUserPlus />
              </Button>
            </WithTooltip>
          )}
          {!isExcluded && !(isGroupHost || isViceGroupHost) && isMe && (
            <WithTooltip tooltip="입찰 포기">
              <Button size="icon" variant="ghost" onClick={() => tryToGiveUpBid(bid)}>
                <LucideUserX />
              </Button>
            </WithTooltip>
          )}
        </div>
      </div>
    </div>
  );
}

type Props = {
  auctionCase: AuctionCaseLike;
  bid: BidWithUser;
  rank: number;
  actualRank: number;
  isGroupHost?: boolean;
  isViceGroupHost?: boolean;
  openBidDetail: () => void;
};
