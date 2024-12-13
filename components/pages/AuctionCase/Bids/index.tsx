'use client';

import ListEmpty from '@/components/common/ListEmpty';
import { Button } from '@/components/ui/button';
import {
  AuctionCaseLike,
  AuctionCaseWithBidsAndUserAndArticles,
} from '@/features/auction-case/types';
import { useHasUserBidden } from '@/features/auction-case/hooks/useHasUserBidden';
import { getAuctionCaseStatus } from '@/features/auction-case/utils';
import { useBidRouter } from '@/features/bid/hooks/useBidRouter';
import { Suspense, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import AuctionResult from './AuctionResult';
import MyBid from './MyBid';

export default function AuctionCaseBids({ auctionCase }: Props) {
  const [status, setStatus] = useState(getAuctionCaseStatus(auctionCase));

  const { hasBidden, bid } = useHasUserBidden(auctionCase);
  const { moveToPlaceBid } = useBidRouter();

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
      return (
        <Button
          className="my-4 mx-auto"
          size="lg"
          type="button"
          onClick={() => moveToPlaceBid(auctionCase)}
        >
          입찰하기
        </Button>
      );
    }
    if (hasBidden && bid?.id) {
      return (
        <Suspense fallback={<MyBid.Skeleton />}>
          <MyBid bidId={bid.id} auctionCase={auctionCase} />
        </Suspense>
      );
    }
  }

  if (status === 'FINISHED_BIDDING' && biddingCount > 0) {
    return <AuctionResult auctionCase={auctionCase as AuctionCaseWithBidsAndUserAndArticles} />;
  }

  if (status === 'FINISHED_BIDDING' && biddingCount <= 0) {
    return <ListEmpty>입찰자가 없습니다</ListEmpty>;
  }

  return null;
}

type Props = {
  auctionCase: AuctionCaseLike | null;
};
