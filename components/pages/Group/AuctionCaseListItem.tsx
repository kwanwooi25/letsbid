'use client';

import { formatSeconds, ONE_DAY, ONE_HOUR } from '@/lib/time';
import { cn } from '@/lib/utils';
import { AuctionCase } from '@prisma/client';
import { differenceInSeconds, format } from 'date-fns';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

export default function AuctionCaseListItem({ auctionCase, status }: Props) {
  const [remainigTime, setRemainigTime] = useState('');
  const { caseYear, caseNumber, bidStartsAt, bidEndsAt } = auctionCase;

  const bidStartsAtDisplay = `입찰 시작: ${format(bidStartsAt, 'yyyy/MM/dd HH:mm')}`;
  const bidEndsAtDisplay = `입찰 종료: ${format(bidEndsAt, 'yyyy/MM/dd HH:mm')}`;

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
    >
      <div className="flex flex-col gap-2">
        <span className="text-lg font-bold">
          {caseYear}타경{caseNumber}
        </span>
        <span className="text-sm text-primary/70">
          {status === 'BIDDING' && bidEndsAtDisplay}
          {status === 'BEFORE_BIDDING' && bidStartsAtDisplay}
          {status === 'FINISHED_BIDDING' && bidEndsAtDisplay}
        </span>
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
  status: 'BIDDING' | 'BEFORE_BIDDING' | 'FINISHED_BIDDING';
};
