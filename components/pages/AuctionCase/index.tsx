'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { PATHS } from '@/const/paths';
import {
  getAuctionCaseName,
  getAuctionCaseStatus,
  getAuctionCaseTimeRefDisplay,
} from '@/lib/auctionCase';
import { formatSeconds, ONE_DAY, ONE_HOUR } from '@/lib/time';
import { cn } from '@/lib/utils';
import { getAuctionCaseDetailQueryOptions } from '@/queries/auction-case/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { differenceInSeconds } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

export default function AuctionCase() {
  const router = useRouter();
  const params = useParams();
  const auctionCaseId = params.auctionCaseId as string;
  const [remainigTime, setRemainigTime] = useState('');
  const { data: auctionCase } = useSuspenseQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));

  const { groupId, bidStartsAt, bidEndsAt } = auctionCase;
  const status = getAuctionCaseStatus(auctionCase);
  const criteriaDateTime = status === 'BEFORE_BIDDING' ? bidStartsAt : bidEndsAt;
  const totalSeconds = differenceInSeconds(criteriaDateTime, new Date());
  const timeRefDisplay = getAuctionCaseTimeRefDisplay(auctionCase);

  const handleClickBackButton = () => router.replace(`${PATHS.GROUP}/${groupId}`);

  useInterval(() => {
    setRemainigTime(formatSeconds(totalSeconds));
  }, 1000);

  return (
    <>
      <PageHeader
        className="max-w-2xl"
        backButton
        onBackButtonClick={handleClickBackButton}
        title={getAuctionCaseName(auctionCase)}
      ></PageHeader>
      <PageBody className="max-w-2xl">
        <div className="flex items-center justify-between min-h-[28px]">
          <span className="text-sm text-primary/70">{timeRefDisplay}</span>
          <div
            className={cn(
              'flex justify-between items-center text-lg font-bold',
              totalSeconds < ONE_HOUR && 'text-red-700',
              totalSeconds < 0 && 'text-gray-500',
              totalSeconds > ONE_HOUR && 'text-yellow-700',
              totalSeconds > ONE_DAY && 'text-green-700',
            )}
          >
            {remainigTime ? `${remainigTime} 남음` : '입찰 종료'}
          </div>
        </div>
      </PageBody>
    </>
  );
}
