import BidDetail from '@/components/BidDetail';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTitle, ScrollableDialogContent } from '@/components/ui/dialog';
import Divider from '@/components/ui/divider';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { Keys } from '@/const/keyboard';
import { getAuctionCaseStatus } from '@/lib/auctionCase';
import { AuctionCaseWithBidsAndUser } from '@/types/auctionCase';
import orderBy from 'lodash/orderBy';
import { LucideChevronLeft, LucideChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { KeyboardEventHandler } from 'react';
import AuctionResultItem from './AuctionResultItem';

export default function AuctionResult({ auctionCase, isGroupHost }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedBidId = searchParams.get('selectedBidId');
  const { bids = [] } = auctionCase;
  const sortedBids = orderBy(bids, 'biddingPrice', 'desc');
  const bidRanks = (() => {
    let currentRank = 0;
    return sortedBids.map((bid) => {
      if (!bid.isExcluded) currentRank += 1;
      return currentRank;
    });
  })();
  const auctionCaseStatus = getAuctionCaseStatus(auctionCase);
  const selectedBid = sortedBids.find((b) => b.id === selectedBidId);
  const selectedBidIndex = sortedBids.findIndex((b) => b.id === selectedBidId);

  const isBidDetailOpen = auctionCaseStatus === 'FINISHED_BIDDING' && !!selectedBid;

  const setSelectedBidId = (bidId?: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (bidId) {
      newSearchParams.set('selectedBidId', bidId);
    } else {
      newSearchParams.delete('selectedBidId');
    }
    router.replace(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const openBidDetail =
    (index: number = 0) =>
    () => {
      const bidId = sortedBids[index].id;
      setSelectedBidId(bidId);
    };

  const handleClickPrevious = () => {
    const newIndex = Math.max(0, selectedBidIndex - 1);
    const bidId = sortedBids[newIndex].id;
    setSelectedBidId(bidId);
  };

  const handleClickNext = () => {
    const newIndex = Math.min(bids.length - 1, selectedBidIndex + 1);
    const bidId = sortedBids[newIndex].id;
    setSelectedBidId(bidId);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === Keys.ArrowLeft || e.key === Keys.ArrowDown) return handleClickPrevious();
    if (e.key === Keys.ArrowRight || e.key === Keys.ArrowUp) return handleClickNext();
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

      <Dialog
        open={isBidDetailOpen}
        onOpenChange={(open) => setSelectedBidId(open ? selectedBidId : null)}
      >
        <ScrollableDialogContent aria-describedby="" onKeyDown={handleKeyDown}>
          <DialogTitle></DialogTitle>
          {!!selectedBid ? (
            <BidDetail auctionCase={auctionCase} bid={selectedBid} />
          ) : (
            <BidDetail.Skeleton />
          )}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button variant="ghost" size="icon" onClick={handleClickPrevious}>
                  <LucideChevronLeft />
                </Button>
              </PaginationItem>
              <PaginationItem className="mx-4">
                {selectedBidIndex + 1} / {sortedBids.length}
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
