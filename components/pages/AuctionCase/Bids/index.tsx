'use client';

import ListEmpty from '@/components/ListEmpty';
import { Button } from '@/components/ui/button';
import { useHasUserBidden } from '@/hooks/useHasUserBidden';
import { getAuctionCaseStatus } from '@/lib/auctionCase';
import { AuctionCaseLike, AuctionCaseWithBidsAndUserAndArticles } from '@/types/auctionCase';
import { Suspense, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { useAuctionCaseDetailRouter } from '../useAuctionCaseDetailRouter';
import AuctionResult from './AuctionResult';
import MyBid from './MyBid';

export default function AuctionCaseBids({ auctionCase, isGroupHost }: Props) {
  const [status, setStatus] = useState(getAuctionCaseStatus(auctionCase));

  const { hasBidden, bid } = useHasUserBidden(auctionCase);
  const { moveToPlaceBid } = useAuctionCaseDetailRouter({ auctionCase });

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
        <Button className="my-4 mx-auto" size="lg" type="button" onClick={moveToPlaceBid}>
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
    return (
      <AuctionResult
        auctionCase={auctionCase as AuctionCaseWithBidsAndUserAndArticles}
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
