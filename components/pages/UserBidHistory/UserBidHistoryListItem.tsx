import BidRankBadge from '@/components/BidRankBadge';
import ListItem from '@/components/ListItem';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { BidWithUserAndAuctionCase } from '@/types/bid';
import { format } from 'date-fns';
import orderBy from 'lodash/orderBy';
import { LucideChevronLeft, LucideChevronRight } from 'lucide-react';
import { useState } from 'react';
import BidDetail from '../AuctionCase/BidDetail';

export default function UserBidHistoryListItem({ bid }: Props) {
  const { isExcluded, excludedReason, biddingPrice, auctionCase } = bid;
  const sortedBids = orderBy(auctionCase.bids, 'biddingPrice', 'desc');
  const bidRanks = (() => {
    let currentRank = 0;
    return sortedBids.map((b) => {
      if (!b.isExcluded) currentRank += 1;
      return currentRank;
    });
  })();
  const myBidIndex = sortedBids.findIndex((b) => b.id === bid.id);
  const myBidRank = bidRanks[myBidIndex];

  const [isBidDetailOpen, setIsBidDetailOpen] = useState(false);
  const [currentBidDetailIndex, setCurrentBidDetailIndex] = useState(0);

  const handleClickPrevious = () => {
    setCurrentBidDetailIndex(Math.max(0, currentBidDetailIndex - 1));
  };

  const handleClickNext = () => {
    setCurrentBidDetailIndex(Math.min(sortedBids.length - 1, currentBidDetailIndex + 1));
  };

  const openBidDetail = () => {
    setIsBidDetailOpen(true);
    setCurrentBidDetailIndex(myBidIndex);
  };

  return (
    <>
      <ListItem onClick={openBidDetail} className="relative">
        <BidRankBadge
          rank={myBidRank}
          isExcluded={isExcluded}
          className="absolute top-0 left-0 translate-x-[-15%] translate-y-[-15%]"
        />
        <div className="flex flex-col gap-2">
          <span className="font-bold text-primary/70">{auctionCase.caseName}</span>
          <span className="text-sm text-primary/50">
            {format(auctionCase.bidEndsAt, 'yyyy-MM-dd HH:mm')} 입찰 종료
          </span>
        </div>
        <div className="flex flex-col items-end justify-start gap-2">
          <span
            className={cn(
              'text-lg font-bold',
              myBidRank === 1 && 'text-red-500',
              myBidRank === 2 && 'text-orange-500',
              isExcluded && 'text-gray-500 line-through',
            )}
          >
            {biddingPrice.toLocaleString()}
          </span>
          {!!excludedReason && (
            <span className="text-yellow-600 font-semibold">{excludedReason}</span>
          )}
        </div>
      </ListItem>

      <Dialog open={isBidDetailOpen} onOpenChange={setIsBidDetailOpen}>
        <DialogContent aria-describedby="">
          <DialogTitle></DialogTitle>
          <BidDetail auctionCase={auctionCase} bid={sortedBids[currentBidDetailIndex]} />
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button variant="ghost" size="icon" onClick={handleClickPrevious}>
                  <LucideChevronLeft />
                </Button>
              </PaginationItem>
              <PaginationItem className="mx-4">
                {currentBidDetailIndex + 1} / {sortedBids.length}
              </PaginationItem>
              <PaginationItem>
                <Button variant="ghost" size="icon" onClick={handleClickNext}>
                  <LucideChevronRight />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </DialogContent>
      </Dialog>
    </>
  );
}

type Props = {
  bid: BidWithUserAndAuctionCase;
};
