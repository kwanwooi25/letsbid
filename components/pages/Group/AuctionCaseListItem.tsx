'use client';

import ListItem from '@/components/ListItem';
import { PATHS } from '@/const/paths';
import {
  getAuctionCaseColor,
  getAuctionCaseTimeRefDisplay,
  getRemainingTimeDisplay,
} from '@/lib/auctionCase';
import { AuctionCaseLike } from '@/types/auctionCase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

export default function AuctionCaseListItem({ auctionCase }: Props) {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState('');
  const [color, setColor] = useState(getAuctionCaseColor(auctionCase));
  const [timeRefDisplay, setTimeRefDisplay] = useState(getAuctionCaseTimeRefDisplay(auctionCase));
  const [bidderCount, setBidderCount] = useState(0);

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
      onClick={() => router.push(`${PATHS.GROUP}/${groupId}${PATHS.AUCTION_CASE}/${id}`)}
    >
      <div className="flex flex-col gap-2">
        <span className="text-lg font-bold">{caseName}</span>
        <span className="text-sm text-primary/70">{timeRefDisplay}</span>
      </div>

      <div className="flex flex-col items-end text-lg">
        {remainingTime && (
          <span>
            <b>{remainingTime}</b> 남음
          </span>
        )}
        {bidderCount > 0 && (
          <span>
            입찰자: <b>{bidderCount.toLocaleString()}명</b>
          </span>
        )}
      </div>
    </ListItem>
  );
}

type Props = {
  auctionCase: AuctionCaseLike;
};
