import BidDetail from '@/components/BidDetail';
import BidDetailSkeleton from '@/components/BidDetail/skeleton';
import { Button } from '@/components/ui/button';
import { getAuctionCaseStatus } from '@/lib/auctionCase';
import { getBidDetailQueryOptions } from '@/queries/bid/query';
import { AuctionCaseLike } from '@/types/auctionCase';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAuctionCaseDetailActions } from '../useAuctionCaseDetailActions';
import { useAuctionCaseDetailRouter } from '../useAuctionCaseDetailRouter';

export default function MyBid({ bidId, auctionCase }: Props) {
  const { data: bid } = useSuspenseQuery(getBidDetailQueryOptions(bidId));
  const { moveToEditBid } = useAuctionCaseDetailRouter({ auctionCase });
  const { tryToCancelBid } = useAuctionCaseDetailActions({ auctionCase });

  const status = getAuctionCaseStatus(auctionCase);

  if (!bid) return null;

  return (
    <div className="w-full max-w-md mx-auto px-6 py-8 border border-primary-foreground shadow-lg">
      <BidDetail auctionCase={auctionCase} bid={bid} />

      {status === 'BIDDING' && (
        <div className="flex items-center justify-between gap-4 mt-4">
          <Button className="mt-4" variant="outline" onClick={() => moveToEditBid(bidId)}>
            입찰표 수정
          </Button>
          <Button className="mt-4" variant="destructive" onClick={() => tryToCancelBid(bidId)}>
            입찰 취소
          </Button>
        </div>
      )}
    </div>
  );
}

function MyBidSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto px-6 py-8 border border-primary-foreground shadow-lg">
      <BidDetailSkeleton />

      <div className="flex items-center justify-between gap-4 mt-4">
        <Button className="mt-4" variant="outline" disabled>
          입찰표 수정
        </Button>
        <Button className="mt-4" variant="destructive" disabled>
          입찰 취소
        </Button>
      </div>
    </div>
  );
}

MyBid.Skeleton = MyBidSkeleton;

type Props = {
  bidId: string;
  auctionCase: AuctionCaseLike;
};
