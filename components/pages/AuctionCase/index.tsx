'use client';

import AuctionCaseStatusBadge from '@/components/AuctionCaseStatusBadge';
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
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import BidDetail from './BidDetail';
import AuctionCaseHeaderButtons from './HeaderButtons';
import PlaceBidButton from './PlaceBidButton';

export default function AuctionCase() {
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;
  const auctionCaseId = params.auctionCaseId as string;
  const [remainingTime, setRemainingTime] = useState('');
  const { data: auctionCase } = useSuspenseQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));
  const isGroupHost = useIsGroupHost(groupId);
  const [color, setColor] = useState(getAuctionCaseColor(auctionCase));
  const [status, setStatus] = useState(getAuctionCaseStatus(auctionCase));
  const [timeRefDisplay, setTimeRefDisplay] = useState(getAuctionCaseTimeRefDisplay(auctionCase));
  const { hasBidden, bid } = useHasUserBidden(auctionCase);

  const biddingCount = auctionCase.bids.length ?? 0;

  const handleClickBackButton = () => router.replace(`${PATHS.GROUP}/${groupId}`);

  useInterval(() => {
    setRemainingTime(getRemainingTimeDisplay(auctionCase));
    setColor(getAuctionCaseColor(auctionCase));
    setStatus(getAuctionCaseStatus(auctionCase));
    setTimeRefDisplay(getAuctionCaseTimeRefDisplay(auctionCase));
  }, 1000);

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
        <div className="flex items-center justify-between min-h-[28px]">
          <div className="flex items-center gap-3">
            <AuctionCaseStatusBadge auctionCase={auctionCase} />
            <span className="text-sm text-primary/70">{timeRefDisplay}</span>
          </div>
          <div
            className={cn(
              'flex justify-between items-center text-lg font-bold',
              color === 'red' && 'text-red-700',
              color === 'gray' && 'text-gray-500',
              color === 'yellow' && 'text-yellow-700',
              color === 'green' && 'text-green-700',
            )}
          >
            {remainingTime && `${remainingTime} 남음`}
          </div>
        </div>

        {biddingCount && (
          <div className="text-center">
            <b className="text-lg">{biddingCount.toLocaleString()}명</b> 입찰 완료
          </div>
        )}

        {status === 'BIDDING' && !hasBidden && <PlaceBidButton auctionCase={auctionCase} />}
        {hasBidden && bid?.id && (
          <Suspense fallback={<div>Loading...</div>}>
            <BidDetail bidId={bid.id} auctionCase={auctionCase} />
          </Suspense>
        )}
      </PageBody>
    </>
  );
}
