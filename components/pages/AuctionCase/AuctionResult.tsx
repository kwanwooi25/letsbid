import DetailRow from '@/components/DetailRow';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Divider from '@/components/ui/divider';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { getAuctionCaseName } from '@/lib/auctionCase';
import { AuctionCaseWithBidsAndUser } from '@/types/auctionCase';
import orderBy from 'lodash/orderBy';
import { LucideChevronLeft, LucideChevronRight } from 'lucide-react';
import { useState } from 'react';
import AuctionResultItem from './AuctionResultItem';
import BidDetail from './BidDetail';

export default function AuctionResult({ auctionCase, isGroupHost }: Props) {
  const [isBidDetailOpen, setIsBidDetailOpen] = useState(false);
  const [currentBidDetailIndex, setCurrentBidDetailIndex] = useState(0);
  const { bids = [] } = auctionCase;
  const auctionCaseName = getAuctionCaseName(auctionCase);
  const sortedBids = orderBy(bids, 'biddingPrice', 'desc');
  const bidRanks = (() => {
    let currentRank = 0;
    return sortedBids.map((bid) => {
      if (!bid.isExcluded) currentRank += 1;
      return currentRank;
    });
  })();

  const openBidDetail = (index: number = 0) => {
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
        <h5 className="mb-4 text-2xl text-center font-bold">입 찰 결 과</h5>
        <DetailRow label="사건 번호" value={auctionCaseName} />

        <Divider />

        {sortedBids.map((bid, index) => {
          const rank = bidRanks[index];

          return (
            <AuctionResultItem
              key={bid.id}
              bid={bid}
              rank={rank}
              isGroupHost={isGroupHost}
              openBidDetail={() => openBidDetail(index)}
            />
          );
        })}
      </div>

      <Dialog open={isBidDetailOpen} onOpenChange={setIsBidDetailOpen}>
        <DialogContent aria-describedby="">
          <DialogTitle className="flex flex-col gap-2">
            <span>{auctionCaseName}</span>
            <span className="text-sm text-primary/50">하하</span>
          </DialogTitle>
          <BidDetail auctionCase={auctionCase} bid={bids[currentBidDetailIndex]} />
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button variant="ghost" size="icon" onClick={handleClickPrevious}>
                  <LucideChevronLeft />
                </Button>
              </PaginationItem>
              <PaginationItem className="mx-4">
                {currentBidDetailIndex + 1} / {bids.length}
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
  auctionCase: AuctionCaseWithBidsAndUser;
  isGroupHost?: boolean;
};
