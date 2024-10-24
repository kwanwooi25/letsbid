'use client';

import ListItem from '@/components/ListItem';
import { PATHS } from '@/const/paths';
import {
  getAuctionCaseColor,
  getAuctionCaseTimeRefDisplay,
  getRemainingTimeDisplay,
} from '@/lib/auctionCase';
import { AuctionCaseLike } from '@/types/auctionCase';
import { LucideClock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

export default function AuctionCaseListItem({ auctionCase }: Props) {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(getRemainingTimeDisplay(auctionCase));
  const [color, setColor] = useState(getAuctionCaseColor(auctionCase));
  const [timeRefDisplay, setTimeRefDisplay] = useState(getAuctionCaseTimeRefDisplay(auctionCase));
  const [bidderCount, setBidderCount] = useState(auctionCase.bids.length);

  const { id, groupId, caseName } = auctionCase;

  useInterval(() => {
    setRemainingTime(getRemainingTimeDisplay(auctionCase));
    setColor(getAuctionCaseColor(auctionCase));
    setTimeRefDisplay(getAuctionCaseTimeRefDisplay(auctionCase));
    setBidderCount(auctionCase.bids.length);
  }, 1000);

  return (
    <ListItem
      color={color}
      onClick={() =>
        router.push(`${PATHS.GROUP}/${groupId}${PATHS.AUCTION_CASE}/${id}`, { scroll: false })
      }
    >
      <div className="flex flex-col gap-2 shrink-0">
        <div className="text-base sm:text-lg font-bold">{caseName}</div>
        <div className="text-xs sm:text-sm text-primary/70">{timeRefDisplay}</div>
      </div>

      <div className="flex flex-col gap-1 justify-between items-end text-right">
        <div className="md:text-lg">
          {bidderCount > 0 && (
            <>
              입찰자: <b>{bidderCount.toLocaleString()}명</b>
            </>
          )}
        </div>
        <div className="flex items-center text-sm sm:text-base md:text-lg">
          {remainingTime && (
            <>
              <LucideClock className="w-4 h-4 mr-1" />
              <b>{remainingTime}</b>
            </>
          )}
        </div>
      </div>
    </ListItem>
  );
}

type Props = {
  auctionCase: AuctionCaseLike;
};
