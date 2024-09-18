'use client';

import ListItem from '@/components/ListItem';
import { PATHS } from '@/const/paths';
import {
  getAuctionCaseColor,
  getAuctionCaseName,
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
  const { id, groupId } = auctionCase;
  const [color, setColor] = useState(getAuctionCaseColor(auctionCase));
  const [timeRefDisplay, setTimeRefDisplay] = useState(getAuctionCaseTimeRefDisplay(auctionCase));

  const auctionCaseName = getAuctionCaseName(auctionCase);

  useInterval(() => {
    setRemainingTime(getRemainingTimeDisplay(auctionCase));
    setColor(getAuctionCaseColor(auctionCase));
    setTimeRefDisplay(getAuctionCaseTimeRefDisplay(auctionCase));
  }, 1000);

  return (
    <ListItem
      color={color}
      onClick={() => router.push(`${PATHS.GROUP}/${groupId}${PATHS.AUCTION_CASE}/${id}`)}
    >
      <div className="flex flex-col gap-2">
        <span className="text-lg font-bold">{auctionCaseName}</span>
        <span className="text-sm text-primary/70">{timeRefDisplay}</span>
      </div>

      {remainingTime && (
        <div className="flex justify-between items-center text-lg font-bold">
          {remainingTime} 남음
        </div>
      )}
    </ListItem>
  );
}

type Props = {
  auctionCase: AuctionCaseLike;
};
