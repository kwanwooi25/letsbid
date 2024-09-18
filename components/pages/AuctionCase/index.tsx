'use client';

import AuctionCaseStatusBadge from '@/components/AuctionCaseStatusBadge';
import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { PATHS } from '@/const/paths';
import { useIsGroupHost } from '@/hooks/useIsGroupHost';
import {
  getAuctionCaseColor,
  getAuctionCaseName,
  getAuctionCaseTimeRefDisplay,
  getRemainingTimeDisplay,
} from '@/lib/auctionCase';
import { cn } from '@/lib/utils';
import { getAuctionCaseDetailQueryOptions } from '@/queries/auction-case/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';
import AuctionCaseHeaderButtons from './HeaderButtons';

export default function AuctionCase() {
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;
  const auctionCaseId = params.auctionCaseId as string;
  const [remainigTime, setRemainigTime] = useState('');
  const { data: auctionCase } = useSuspenseQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));
  const isGroupHost = useIsGroupHost(groupId);

  const color = getAuctionCaseColor(auctionCase);
  const timeRefDisplay = getAuctionCaseTimeRefDisplay(auctionCase);

  const handleClickBackButton = () => router.replace(`${PATHS.GROUP}/${groupId}`);

  useInterval(() => setRemainigTime(getRemainingTimeDisplay(auctionCase)), 1000);

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
      <PageBody className="max-w-2xl">
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
            {remainigTime && `${remainigTime} 남음`}
          </div>
        </div>
      </PageBody>
    </>
  );
}
