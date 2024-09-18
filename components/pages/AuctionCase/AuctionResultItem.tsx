import MeBadge from '@/components/MeBadge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getAuctionCaseName } from '@/lib/auctionCase';
import { cn } from '@/lib/utils';
import { AuctionCaseLike } from '@/types/auctionCase';
import { BidWithUser } from '@/types/bid';
import { useSession } from 'next-auth/react';
import BidDetail from './BidDetail';

export default function AuctionResultItem({ auctionCase, bid, rank }: Props) {
  const session = useSession();
  const auctionCaseName = getAuctionCaseName(auctionCase);
  const { user, biddingPrice, isExcluded, excludedReason } = bid;
  const isMe = session?.data?.user?.id === user?.id;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="self-start flex items-center gap-2">
        <span
          className={cn(
            'shrink-0 w-[42px] p-[0.15rem] border-2 text-xs text-center rotate-[-8deg]',
            rank === 1 && 'text-red-500 border-red-500',
            rank === 2 && 'text-orange-500 border-orange-500',
            isExcluded && 'text-gray-500 border-gray-500',
          )}
        >
          {isExcluded ? '제외' : rank === 1 ? '낙찰' : rank === 2 ? '차순위' : `${rank}순위`}
        </span>
        <span
          className={cn(
            rank && rank <= 2 && 'text-primary/80',
            isExcluded && 'text-gray-500 line-through',
          )}
        >
          {user?.name}
        </span>
        {isMe && <MeBadge />}
      </div>
      <div className="relative self-end flex flex-col items-end md:flex-row md:items-center gap-2">
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
        {!!excludedReason && (
          <span className="absolute top-[-14px] left-[-42px] rotate-[-5deg] text-yellow-600 font-semibold">
            {excludedReason}
          </span>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              입찰표
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="flex flex-col gap-2">
              <span>{auctionCaseName}</span>
              <span className="text-sm text-primary/50">{user?.name}</span>
            </DialogTitle>
            <BidDetail auctionCase={auctionCase} bid={bid} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

type Props = {
  auctionCase: AuctionCaseLike;
  bid: BidWithUser;
  rank?: number;
};
