import DetailRow from '@/components/DetailRow';
import Divider from '@/components/ui/divider';
import { getAuctionCaseName } from '@/lib/auctionCase';
import { AuctionCaseWithBidsAndUser } from '@/types/auctionCase';
import orderBy from 'lodash/orderBy';
import AuctionResultItem from './AuctionResultItem';

export default function AuctionResult({ auctionCase, isGroupHost }: Props) {
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

  return (
    <div className="w-full max-w-lg mx-auto px-6 py-8 flex flex-col gap-4 border border-primary-foreground shadow-lg">
      <h5 className="mb-4 text-2xl text-center font-bold">입 찰 결 과</h5>
      <DetailRow label="사건 번호" value={auctionCaseName} />

      <Divider />

      {sortedBids.map((bid, index) => {
        const rank = bidRanks[index];

        return (
          <AuctionResultItem
            key={bid.id}
            auctionCase={auctionCase}
            bid={bid}
            rank={rank}
            isGroupHost={isGroupHost}
          />
        );
      })}
    </div>
  );
}

type Props = {
  auctionCase: AuctionCaseWithBidsAndUser;
  isGroupHost?: boolean;
};
