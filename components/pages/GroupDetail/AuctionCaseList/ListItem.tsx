'use client';

import AuctionCaseStatusBadge from '@/components/common/AuctionCaseStatusBadge';
import ListItem from '@/components/common/ListItem';
import WithTooltip from '@/components/common/WithTooltip';
import { PATHS } from '@/const/paths';
import {
  AuctionCaseLike,
  getAuctionCaseColor,
  getFullAddress,
  getRemainingTimeDisplay,
} from '@/features/auction-case';
import AuctionCaseMenu from '@/features/auction-case/components/AuctionCaseMenu';
import { useLoggedInUser } from '@/hooks';
import { cn } from '@/lib/utils';
import { LucideNotebookText, LucideTimer, LucideUsersRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

export default function AuctionCaseListItem({ auctionCase }: Props) {
  const { loggedInUser } = useLoggedInUser();
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(getRemainingTimeDisplay(auctionCase));
  const [color, setColor] = useState(getAuctionCaseColor(auctionCase));
  const [bidderCount, setBidderCount] = useState(auctionCase.bids.length);
  const [articleCount, setArticleCount] = useState(auctionCase.articles.length);

  const { id, groupId, caseName, address, addressDetail, group } = auctionCase;
  const isViewable = loggedInUser && group.userRoles.includes(loggedInUser.role);
  const fullAddress = getFullAddress({ address, addressDetail });

  const handleClickListItem = () => {
    if (!isViewable) return;

    router.push(`${PATHS.GROUP}/${groupId}${PATHS.AUCTION_CASE}/${id}`);
  };

  useInterval(() => {
    setRemainingTime(getRemainingTimeDisplay(auctionCase));
    setColor(getAuctionCaseColor(auctionCase));
    setBidderCount(auctionCase.bids.length);
    setArticleCount(auctionCase.articles.length);
  }, 1000);

  return (
    <ListItem
      className={cn('flex-col', !isViewable && '!cursor-not-allowed')}
      color={color}
      onClick={handleClickListItem}
    >
      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <AuctionCaseStatusBadge auctionCase={auctionCase} />
          {remainingTime && (
            <WithTooltip tooltip="남은 시간">
              <div className="flex items-center gap-1">
                <LucideTimer className="w-4 h-4 mr-1" />
                <b>{remainingTime}</b>
              </div>
            </WithTooltip>
          )}
        </div>
        <div className="flex items-center gap-2">
          {articleCount > 0 && (
            <WithTooltip tooltip="조사 내용">
              <div className="flex items-center gap-1">
                <LucideNotebookText className="w-4 h-4 mr-1" />
                <b>{articleCount.toLocaleString()}</b>
              </div>
            </WithTooltip>
          )}
          {bidderCount > 0 && (
            <WithTooltip tooltip="입찰자">
              <div className="flex items-center gap-1">
                <LucideUsersRound className="w-4 h-4 mr-1" />
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
