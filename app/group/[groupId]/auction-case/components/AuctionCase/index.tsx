'use client';

import AuctionCaseStatusBadge from '@/components/AuctionCaseStatusBadge';
import DetailRow from '@/components/DetailRow';
import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import Divider from '@/components/ui/divider';
import { PATHS } from '@/const/paths';
import { useHasUserBidden } from '@/hooks/useHasUserBidden';
import { useIsGroupHost } from '@/hooks/useIsGroupHost';
import {
  getAuctionCaseColor,
  getAuctionCaseStatus,
  getAuctionCaseTimeRefDisplay,
  getRemainingTimeDisplay,
} from '@/lib/auctionCase';
import { formatDateTime } from '@/lib/datetime';
import { cn } from '@/lib/utils';
import { getAuctionCaseDetailQueryOptions } from '@/queries/auction-case/query';
import { getGroupDetailQueryOptions } from '@/queries/group/query';
import { AuctionCaseWithBidsAndUser } from '@/types/auctionCase';
import { BidWithUser } from '@/types/bid';
import { useSuspenseQueries } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import AuctionResult from './AuctionResult';
import AuctionCaseHeaderButtons from './HeaderButtons';
import MyBid from './MyBid';
import MyBidSkeleton from './MyBidSkeleton';
import PlaceBidButton from './PlaceBidButton';
import AuctionCaseSkeleton from './skeleton';

export default function AuctionCase() {
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;
  const auctionCaseId = params.auctionCaseId as string;
  const [{ data: group }, { data: auctionCase, refetch: refetchAuctionCase }] = useSuspenseQueries({
    queries: [getGroupDetailQueryOptions(groupId), getAuctionCaseDetailQueryOptions(auctionCaseId)],
  });
  const { isGroupHost } = useIsGroupHost(group.hostId);
  const [remainingTime, setRemainingTime] = useState(getRemainingTimeDisplay(auctionCase));
  const [color, setColor] = useState(getAuctionCaseColor(auctionCase));
  const [status, setStatus] = useState(getAuctionCaseStatus(auctionCase));
  const [timeRefDisplay, setTimeRefDisplay] = useState(getAuctionCaseTimeRefDisplay(auctionCase));
  const { hasBidden, bid } = useHasUserBidden(auctionCase);

  useInterval(() => {
    setRemainingTime(getRemainingTimeDisplay(auctionCase));
    setColor(getAuctionCaseColor(auctionCase));
    setStatus(getAuctionCaseStatus(auctionCase));
    setTimeRefDisplay(getAuctionCaseTimeRefDisplay(auctionCase));
  }, 1000);

  useEffect(() => {
    if (status === 'FINISHED_BIDDING') refetchAuctionCase();
  }, [status, refetchAuctionCase]);

  if (!auctionCase) return <AuctionCaseSkeleton />;

  const { caseName, image, appraisedValue, startingBid, actualBidStartsAt } = auctionCase;

  const hasAuctionCaseDetail =
    appraisedValue > 0 || startingBid > 0 || !!actualBidStartsAt || !!image;

  const biddingCount = auctionCase.bids.length ?? 0;
  const areBidsFinalized = (auctionCase.bids as BidWithUser[]).every((bid) => bid.biddingPrice);

  const handleClickBackButton = () => router.replace(`${PATHS.GROUP}/${groupId}`);

  return (
    <>
      <PageHeader
        className="max-w-2xl"
        backButton
        onBackButtonClick={handleClickBackButton}
        title={auctionCase.caseName}
      >
        {isGroupHost && <AuctionCaseHeaderButtons auctionCase={auctionCase} />}
      </PageHeader>
      <PageBody className="max-w-2xl flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between min-h-[28px]">
          <div className="flex items-center gap-3">
            <AuctionCaseStatusBadge auctionCase={auctionCase} />
            <span className="text-sm text-primary/70">{timeRefDisplay}</span>
          </div>
          <div className="self-end flex flex-col items-end">
            {remainingTime && (
              <div
                className={cn(
                  'text-lg font-bold',
                  color === 'red' && 'text-red-700',
                  color === 'gray' && 'text-gray-500',
                  color === 'yellow' && 'text-yellow-700',
                  color === 'green' && 'text-green-700',
                )}
              >
                {remainingTime} 남음
              </div>
            )}
            {status !== 'BEFORE_BIDDING' && (
              <div className="text-center">
                입찰자: <b className="text-lg">{biddingCount.toLocaleString()}명</b>
              </div>
            )}
          </div>
        </div>

        {hasAuctionCaseDetail && (
          <>
            <div className="flex flex-col gap-4">
              <h5 className="text-2xl font-bold self-center mb-4">기 초 정 보</h5>
              <div className="flex flex-col gap-2 max-w-xs w-full self-center">
                {appraisedValue > 0 && (
                  <DetailRow label="감정가" value={appraisedValue.toLocaleString()} />
                )}
                {startingBid > 0 && (
                  <DetailRow label="최저가" value={startingBid.toLocaleString()} />
                )}
                {!!actualBidStartsAt && (
                  <DetailRow
                    label="실제 입찰일"
                    value={formatDateTime(actualBidStartsAt, 'yyyy-MM-dd (ccc)')}
                  />
                )}
              </div>
              {image && (
                <>
                  <Divider />
                  <Link href={image} rel="noreferrer noopener" target="_blank">
                    <Image src={image} alt={caseName} width={1000} height={700} />
                  </Link>
                </>
              )}
            </div>
            <Divider />
          </>
        )}

        {status === 'BIDDING' && !hasBidden && <PlaceBidButton auctionCase={auctionCase} />}

        {status === 'BIDDING' && hasBidden && bid?.id && (
          <Suspense fallback={<MyBidSkeleton />}>
            <MyBid bidId={bid.id} auctionCase={auctionCase} />
          </Suspense>
        )}

        {status === 'FINISHED_BIDDING' && biddingCount > 0 && areBidsFinalized && (
          <AuctionResult
            auctionCase={auctionCase as AuctionCaseWithBidsAndUser}
            isGroupHost={isGroupHost}
          />
        )}
      </PageBody>
    </>
  );
}
