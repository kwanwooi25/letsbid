'use client';

import AuctionCaseStatusBadge from '@/components/AuctionCaseStatusBadge';
import Loading from '@/components/Loading';
import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { PATHS } from '@/const/paths';
import { useHasUserBidden } from '@/hooks/useHasUserBidden';
import { useIsGroupHost } from '@/hooks/useIsGroupHost';
import {
  getAuctionCaseColor,
  getAuctionCaseName,
  getAuctionCaseStatus,
  getAuctionCaseTimeRefDisplay,
  getRemainingTimeDisplay,
} from '@/lib/auctionCase';
import { cn } from '@/lib/utils';
import { getAuctionCaseDetailQueryOptions } from '@/queries/auction-case/query';
import { getGroupDetailQueryOptions } from '@/queries/group/query';
import { AuctionCaseWithBidsAndUser } from '@/types/auctionCase';
import { BidWithUser } from '@/types/bid';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import AuctionResult from './AuctionResult';
import AuctionCaseHeaderButtons from './HeaderButtons';
import MyBid from './MyBid';
import PlaceBidButton from './PlaceBidButton';

export default function AuctionCase() {
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;
  const auctionCaseId = params.auctionCaseId as string;
  const [remainingTime, setRemainingTime] = useState('');
  const [{ data: group }, { data: auctionCase, refetch: refetchAuctionCase }] = useSuspenseQueries({
    queries: [getGroupDetailQueryOptions(groupId), getAuctionCaseDetailQueryOptions(auctionCaseId)],
  });
  const { isGroupHost } = useIsGroupHost(group.hostId);
  const [color, setColor] = useState(getAuctionCaseColor(auctionCase));
  const [status, setStatus] = useState(getAuctionCaseStatus(auctionCase));
  const [timeRefDisplay, setTimeRefDisplay] = useState(getAuctionCaseTimeRefDisplay(auctionCase));
  const { hasBidden, bid } = useHasUserBidden(auctionCase);

  const biddingCount = auctionCase.bids.length ?? 0;
  const areBidsFinalized = (auctionCase.bids as BidWithUser[]).every((bid) => bid.biddingPrice);

  const handleClickBackButton = () => router.replace(`${PATHS.GROUP}/${groupId}`);

  useInterval(() => {
    setRemainingTime(getRemainingTimeDisplay(auctionCase));
    setColor(getAuctionCaseColor(auctionCase));
    setStatus(getAuctionCaseStatus(auctionCase));
    setTimeRefDisplay(getAuctionCaseTimeRefDisplay(auctionCase));
  }, 1000);

  useEffect(() => {
    if (status === 'FINISHED_BIDDING') refetchAuctionCase();
  }, [status, refetchAuctionCase]);

  return (
    <>
      <PageHeader
        className="max-w-2xl"
        backButton
        onBackButtonClick={handleClickBackButton}
        title={getAuctionCaseName(auctionCase)}
      >
        {isGroupHost && <AuctionCaseHeaderButtons auctionCase={auctionCase} />}
      </PageHeader>
      <PageBody className="max-w-2xl flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between min-h-[28px]">
          <div className="flex items-center gap-3">
            <AuctionCaseStatusBadge auctionCase={auctionCase} />
            <span className="text-sm text-primary/70">{timeRefDisplay}</span>
          </div>
          <div
            className={cn(
              'self-end flex justify-between items-center text-lg font-bold',
              color === 'red' && 'text-red-700',
              color === 'gray' && 'text-gray-500',
              color === 'yellow' && 'text-yellow-700',
              color === 'green' && 'text-green-700',
            )}
          >
            {remainingTime && `${remainingTime} 남음`}
          </div>
        </div>

        {status !== 'BEFORE_BIDDING' && biddingCount > 0 && (
          <div className="text-center">
            <b className="text-lg">{biddingCount.toLocaleString()}명</b> 입찰 완료
          </div>
        )}

        {status !== 'BEFORE_BIDDING' && biddingCount <= 0 && (
          <div className="text-center text-lg font-bold">입찰자 없음</div>
        )}

        {status === 'BIDDING' && !hasBidden && <PlaceBidButton auctionCase={auctionCase} />}

        {status === 'BIDDING' && hasBidden && bid?.id && (
          <Suspense fallback={<Loading />}>
            <MyBid bidId={bid.id} auctionCase={auctionCase} />
          </Suspense>
        )}

        {status === 'FINISHED_BIDDING' && biddingCount > 0 && areBidsFinalized && (
          <Suspense fallback={<Loading />}>
            <AuctionResult auctionCase={auctionCase as AuctionCaseWithBidsAndUser} />
          </Suspense>
        )}
      </PageBody>
    </>
  );
}
