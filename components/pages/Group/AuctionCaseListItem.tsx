'use client';

import { PATHS } from '@/const/paths';
import {
  getAuctionCaseName,
  getAuctionCaseStatus,
  getAuctionCaseTimeRefDisplay,
} from '@/lib/auctionCase';
import { formatSeconds, ONE_DAY, ONE_HOUR } from '@/lib/time';
import { cn } from '@/lib/utils';
import { AuctionCase } from '@prisma/client';
import { differenceInSeconds } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

export default function AuctionCaseListItem({ auctionCase }: Props) {
  const router = useRouter();
  const [remainigTime, setRemainigTime] = useState('');
  const { bidStartsAt, bidEndsAt, id, groupId } = auctionCase;

  const timeRefDisplay = getAuctionCaseTimeRefDisplay(auctionCase);

  const status = getAuctionCaseStatus(auctionCase);
  const criteriaDateTime = status === 'BEFORE_BIDDING' ? bidStartsAt : bidEndsAt;
  const totalSeconds = differenceInSeconds(criteriaDateTime, new Date());

  useInterval(() => {
    setRemainigTime(formatSeconds(totalSeconds));
  }, 1000);

  return (
    <li
      className={cn(
        'flex gap-2 justify-between p-4 border border-primary/30 rounded-sm hover:bg-primary-foreground hover:cursor-pointer transition-colors',
        totalSeconds < ONE_HOUR && 'bg-red-100/20 hover:bg-red-100/50 border-red-700/50',
        totalSeconds < 0 && 'bg-gray-100/20 hover:bg-gray-100/50 border-gray-700/50',
        totalSeconds > ONE_HOUR && 'bg-yellow-100/20 hover:bg-yellow-100/50 border-yellow-700/50',
        totalSeconds > ONE_DAY && 'bg-green-100/20 hover:bg-green-100/50 border-green-700/50',
      )}
      onClick={() => router.push(`${PATHS.GROUP}/${groupId}${PATHS.AUCTION_CASE}/${id}`)}
    >
      <div className="flex flex-col gap-2">
        <span className="text-lg font-bold">{getAuctionCaseName(auctionCase)}</span>
        <span className="text-sm text-primary/70">{timeRefDisplay}</span>
      </div>

      {remainigTime && (
        <div
          className={cn(
            'flex justify-between items-center text-lg font-bold',
            totalSeconds < ONE_HOUR && 'text-red-700',
            totalSeconds > ONE_HOUR && 'text-yellow-700',
            totalSeconds > ONE_DAY && 'text-green-700',
          )}
        >
          {remainigTime} 남음
        </div>
      )}
    </li>
  );
}

type Props = {
  auctionCase: AuctionCase;
};
