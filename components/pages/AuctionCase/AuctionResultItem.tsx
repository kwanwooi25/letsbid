import MeBadge from '@/components/MeBadge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getAuctionCaseName } from '@/lib/auctionCase';
import { cn } from '@/lib/utils';
import { AuctionCaseLike } from '@/types/auctionCase';
import { BidWithUser } from '@/types/bid';
import { useSession } from 'next-auth/react';
import { Suspense } from 'react';
import BidDetail from './BidDetail';

export default function AuctionResultItem({ auctionCase, bid, rank }: Props) {
  const session = useSession();
  const isMe = session?.data?.user?.id === bid.user.id;
  const auctionCaseName = getAuctionCaseName(auctionCase);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'w-[42px] p-[0.15rem] border-2 text-xs text-center rotate-[-8deg]',
            rank === 1 && 'text-red-500 border-red-500',
            rank === 2 && 'text-orange-500 border-orange-500',
          )}
        >
          {rank === 1 ? '낙찰' : rank === 2 ? '차순위' : `${rank}순위`}
        </span>
        <span className={cn(rank && rank <= 2 && 'text-primary/80')}>{bid.user.name}</span>
        {isMe && <MeBadge />}
      </div>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'text-lg font-bold',
            rank === 1 && 'text-red-500 border-red-500',
            rank === 2 && 'text-orange-500 border-orange-500',
          )}
        >
          {bid.biddingPrice.toLocaleString()}
        </span>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              입찰표
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="flex flex-col gap-2">
              <span>{auctionCaseName}</span>
              <span className="text-sm text-primary/50">{bid.user.name}</span>
            </DialogTitle>
            <DialogDescription>
              <Suspense fallback={<div>Loading...</div>}>
                <BidDetail auctionCase={auctionCase} bid={bid} />
              </Suspense>
            </DialogDescription>
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
