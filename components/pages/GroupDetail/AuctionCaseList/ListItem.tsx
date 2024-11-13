'use client';

import AuctionCaseStatusBadge from '@/components/AuctionCaseStatusBadge';
import ListItem from '@/components/ListItem';
import { PATHS } from '@/const/paths';
import { getAuctionCaseColor, getFullAddress, getRemainingTimeDisplay } from '@/lib/auctionCase';
import { AuctionCaseLike } from '@/types/auctionCase';
import { LucideTimer } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

export default function AuctionCaseListItem({ auctionCase }: Props) {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(getRemainingTimeDisplay(auctionCase));
  const [color, setColor] = useState(getAuctionCaseColor(auctionCase));
  const [bidderCount, setBidderCount] = useState(auctionCase.bids.length);

  const { id, groupId, caseName, address, addressDetail } = auctionCase;
  const fullAddress = getFullAddress({ address, addressDetail });

  useInterval(() => {
    setRemainingTime(getRemainingTimeDisplay(auctionCase));
    setColor(getAuctionCaseColor(auctionCase));
    setBidderCount(auctionCase.bids.length);
  }, 1000);

  return (
    <ListItem
      className="min-h-[82px] sm:min-h-[94px]"
      color={color}
      onClick={() => router.push(`${PATHS.GROUP}/${groupId}${PATHS.AUCTION_CASE}/${id}`)}
    >
      <div className="flex flex-col gap-2 flex-1 items-start">
        <AuctionCaseStatusBadge auctionCase={auctionCase} />
        <div className="text-base min-h-[24px] sm:text-lg sm:min-h-[28px] font-bold">
          {caseName}
        </div>
        <div className="text-xs min-h-[16px] sm:text-sm sm:min-h-[20px] font-semibold text-primary/70 line-clamp-1">
          {fullAddress}
        </div>
      </div>

      <div className="flex flex-col gap-1 justify-between items-end text-right shrink-0">
        <div className="min-h-[24px] md:min-h-[28px] md:text-lg">
          {bidderCount > 0 && (
            <>
              입찰자: <b>{bidderCount.toLocaleString()}명</b>
            </>
          )}
        </div>
        <div className="flex items-center text-sm min-h-[20px] sm:text-base sm:min-h-[24px] md:text-lg md:min-h-[28px]">
          {remainingTime && (
            <>
              <LucideTimer className="w-4 h-4 mr-1" />
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
