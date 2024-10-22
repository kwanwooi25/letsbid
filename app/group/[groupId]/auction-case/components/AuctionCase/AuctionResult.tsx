import BidDetail from '@/components/BidDetail';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTitle, ScrollableDialogContent } from '@/components/ui/dialog';
import Divider from '@/components/ui/divider';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { AuctionCaseWithBidsAndUser } from '@/types/auctionCase';
import orderBy from 'lodash/orderBy';
import { LucideChevronLeft, LucideChevronRight } from 'lucide-react';
import { useState } from 'react';
import AuctionResultItem from './AuctionResultItem';

export default function AuctionResult({ auctionCase, isGroupHost }: Props) {
  const [isBidDetailOpen, setIsBidDetailOpen] = useState(false);
  const [currentBidDetailIndex, setCurrentBidDetailIndex] = useState(0);
  const { bids = [] } = auctionCase;
  const sortedBids = orderBy(bids, 'biddingPrice', 'desc');
  const bidRanks = (() => {
    let currentRank = 0;
    return sortedBids.map((bid) => {
      if (!bid.isExcluded) currentRank += 1;
      return currentRank;
    });
  })();

  const openBidDetail =
    (index: number = 0) =>
    () => {
      setIsBidDetailOpen(true);
      setCurrentBidDetailIndex(index);
    };

  const handleClickPrevious = () => {
    setCurrentBidDetailIndex(Math.max(0, currentBidDetailIndex - 1));
  };

  const handleClickNext = () => {
    setCurrentBidDetailIndex(Math.min(bids.length - 1, currentBidDetailIndex + 1));
  };

  return (
    <>
      <div className="w-full max-w-lg mx-auto px-6 py-8 flex flex-col gap-4 border border-primary-foreground shadow-lg">
        <h5 className="text-2xl text-center font-bold">입 찰 결 과</h5>

        <Divider />

        <div className="flex flex-col gap-6 my-4">
          {sortedBids.map((bid, index) => {
            return (
              <AuctionResultItem
                key={bid.id}
                bid={bid}
                rank={index + 1}
                actualRank={bidRanks[index]}
                isGroupHost={isGroupHost}
                openBidDetail={openBidDetail(index)}
              />
            );
          })}
        </div>
      </div>

      <Dialog open={isBidDetailOpen} onOpenChange={setIsBidDetailOpen}>
        <ScrollableDialogContent aria-describedby="">
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
        </ScrollableDialogContent>
      </Dialog>
    </>
  );
}

type Props = {
  auctionCase: AuctionCaseWithBidsAndUser;
  isGroupHost?: boolean;
};
