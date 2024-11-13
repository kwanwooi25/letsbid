'use client';

import ListEmpty from '@/components/ListEmpty';
import { useHasUserBidden } from '@/hooks/useHasUserBidden';
import { getAuctionCaseStatus } from '@/lib/auctionCase';
import { AuctionCaseLike, AuctionCaseWithBidsAndUser } from '@/types/auctionCase';
import { Suspense, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import AuctionResult from './AuctionResult';
import MyBid from './MyBid';
import MyBidSkeleton from './MyBidSkeleton';
import PlaceBidButton from './PlaceBidButton';

export default function AuctionCaseBids({ auctionCase, isGroupHost }: Props) {
  const [status, setStatus] = useState(getAuctionCaseStatus(auctionCase));

  const { hasBidden, bid } = useHasUserBidden(auctionCase);

  useInterval(() => {
    setStatus(getAuctionCaseStatus(auctionCase));
  }, 1000);

  if (!auctionCase) return null;

  const biddingCount = auctionCase.bids.length ?? 0;

  if (status === 'BEFORE_BIDDING') {
    return <ListEmpty>아직 입찰이 시작되지 않았습니다</ListEmpty>;
  }

  if (status === 'BIDDING') {
    if (!hasBidden) {
      return <PlaceBidButton auctionCase={auctionCase} />;
    }
    if (hasBidden && bid?.id) {
      return (
        <Suspense fallback={<MyBidSkeleton />}>
          <MyBid bidId={bid.id} auctionCase={auctionCase} />
        </Suspense>
      );
    }
  }

  if (status === 'FINISHED_BIDDING' && biddingCount > 0) {
    return (
      <AuctionResult
        auctionCase={auctionCase as AuctionCaseWithBidsAndUser}
        isGroupHost={isGroupHost}
      />
    );
  }

  return null;
}

type Props = {
  auctionCase: AuctionCaseLike | null;
  isGroupHost?: boolean;
};
