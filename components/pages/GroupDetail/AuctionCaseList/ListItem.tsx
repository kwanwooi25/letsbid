'use client';

import AuctionCaseStatusBadge from '@/components/common/AuctionCaseStatusBadge';
import ListItem from '@/components/common/ListItem';
import WithTooltip from '@/components/common/WithTooltip';
import Icon from '@/components/ui/icon';
import { PATHS } from '@/const/paths';
import AuctionCaseMenu from '@/features/auction-case/AuctionCaseMenu';
import { AuctionCaseLike } from '@/features/auction-case/types';
import {
  getAuctionCaseColor,
  getFullAddress,
  getRemainingTimeDisplay,
} from '@/features/auction-case/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

export default function AuctionCaseListItem({ auctionCase }: Props) {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(getRemainingTimeDisplay(auctionCase));
  const [color, setColor] = useState(getAuctionCaseColor(auctionCase));
  const [bidderCount, setBidderCount] = useState(auctionCase.bids.length);
  const [articleCount, setArticleCount] = useState(auctionCase.articles.length);

  const { id, groupId, caseName, address, addressDetail } = auctionCase;
  const fullAddress = getFullAddress({ address, addressDetail });

  useInterval(() => {
    setRemainingTime(getRemainingTimeDisplay(auctionCase));
    setColor(getAuctionCaseColor(auctionCase));
    setBidderCount(auctionCase.bids.length);
    setArticleCount(auctionCase.articles.length);
  }, 1000);

  return (
    <ListItem
      className="flex-col"
      color={color}
      onClick={() => router.push(`${PATHS.GROUP}/${groupId}${PATHS.AUCTION_CASE}/${id}`)}
    >
      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <AuctionCaseStatusBadge auctionCase={auctionCase} />
          {remainingTime && (
            <WithTooltip tooltip="남은 시간">
              <div className="flex items-center gap-1">
                <Icon name="timer" className="w-4 h-4 mr-1" />
                <b>{remainingTime}</b>
              </div>
            </WithTooltip>
          )}
        </div>
        <div className="flex items-center gap-2">
          {articleCount > 0 && (
            <WithTooltip tooltip="조사 내용">
              <div className="flex items-center gap-1">
                <Icon name="notebook-text" className="w-4 h-4 mr-1" />
                <b>{articleCount.toLocaleString()}</b>
              </div>
            </WithTooltip>
          )}
          {bidderCount > 0 && (
            <WithTooltip tooltip="입찰자">
              <div className="flex items-center gap-1">
                <Icon name="users-round" className="w-4 h-4 mr-1" />
                <b>{bidderCount.toLocaleString()}</b>
              </div>
            </WithTooltip>
          )}
        </div>
      </div>

      <div className="w-full flex items-center gap-4">
        <div className="flex flex-col gap-1 flex-1 items-start">
          <div className="text-base min-h-[24px] sm:text-lg sm:min-h-[28px] font-bold">
            {caseName}
          </div>
          <div className="text-xs min-h-[16px] sm:text-sm sm:min-h-[20px] font-semibold opacity-70 line-clamp-1">
            {fullAddress}
          </div>
        </div>

        <AuctionCaseMenu triggerClassName="shrink-0" auctionCase={auctionCase} />
      </div>
    </ListItem>
  );
}

type Props = {
  auctionCase: AuctionCaseLike;
};
