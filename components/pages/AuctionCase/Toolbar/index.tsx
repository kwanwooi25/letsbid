'use client';

import AuctionCaseStatusBadge from '@/components/common/AuctionCaseStatusBadge';
import { AUCTION_CASE_PAGE_HEADER_HEIGHT, GNB_HEIGHT } from '@/components/layouts/const';
import PageToolbar from '@/components/layouts/PageToolbar';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { AuctionCaseLike } from '@/features/auction-case/types';
import {
  getAuctionCaseColor,
  getAuctionCaseStatus,
  getAuctionCaseTimeRefDisplay,
  getRemainingTimeDisplay,
} from '@/features/auction-case/utils';
import { cn } from '@/lib/utils';
import { LucideChevronRight, LucideNotebookPen } from 'lucide-react';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { useAuctionCaseDetailRouter } from '../useAuctionCaseDetailRouter';
import { useAuctionCaseDetailTabs } from '../useAuctionCaseDetailTabs';
import AuctionCaseDetailTabsList from './AuctionCaseDetailTabsList';
import AucitonCasePageToolbarSkeleton from './skeleton';

export default function AuctionCasePageToolbar({ auctionCase }: Props) {
  const { tab } = useAuctionCaseDetailTabs();
  const { moveToAddArticle } = useAuctionCaseDetailRouter({ auctionCase });

  const [remainingTime, setRemainingTime] = useState(getRemainingTimeDisplay(auctionCase));
  const [color, setColor] = useState(getAuctionCaseColor(auctionCase));
  const [status, setStatus] = useState(getAuctionCaseStatus(auctionCase));
  const [timeRefDisplay, setTimeRefDisplay] = useState(getAuctionCaseTimeRefDisplay(auctionCase));

  useInterval(() => {
    setRemainingTime(getRemainingTimeDisplay(auctionCase));
    setColor(getAuctionCaseColor(auctionCase));
    setStatus(getAuctionCaseStatus(auctionCase));
    setTimeRefDisplay(getAuctionCaseTimeRefDisplay(auctionCase));
  }, 1000);

  if (!auctionCase) return <AucitonCasePageToolbarSkeleton />;

  const biddingCount = auctionCase.bids.length ?? 0;
  const { bidStartsAt, bidEndsAt } = timeRefDisplay;

  return (
    <PageToolbar
      className="flex flex-col gap-4"
      stickyTop={GNB_HEIGHT + AUCTION_CASE_PAGE_HEADER_HEIGHT}
    >
      <div className="flex items-center gap-4 lg:flex-col">
        <AuctionCaseDetailTabsList />
        {tab === 'articles' && (
          <Button onClick={moveToAddArticle}>
            <LucideNotebookPen className="w-4 h-4 mr-2" />
            조사 내용 등록
          </Button>
        )}
      </div>
      <div className="flex flex-col items-start sm:flex-row sm:items-center lg:flex-col justify-between gap-4">
        <div className="w-full flex items-center justify-between gap-4 lg:flex-col lg:gap-0">
          <div className="flex flex-col items-start gap-1 shrink-0 lg:w-full lg:items-center">
            <AuctionCaseStatusBadge auctionCase={auctionCase} />
            {status !== 'BEFORE_BIDDING' && (
              <div className="text-center self-end sm:self-center">
                입찰자: <b className="text-lg">{biddingCount.toLocaleString()}명</b>
              </div>
            )}
            <Divider className="hidden w-full lg:block" />
          </div>
          <div className="flex flex-col gap-1 lg:w-full lg:items-center">
            <div className="flex items-center gap-2 lg:flex-col">
              <span
                className={cn(
                  'text-xs sm:text-sm text-primary/70',
                  status === 'BEFORE_BIDDING' && 'font-bold text-primary',
                )}
              >
                {bidStartsAt}
              </span>
              <LucideChevronRight className="w-3 h-3 lg:rotate-90 text-primary/70" />
              <span
                className={cn(
                  'text-xs sm:text-sm text-primary/70',
                  status === 'BIDDING' && 'font-bold text-primary',
                )}
              >
                {bidEndsAt}
              </span>
            </div>
            {remainingTime && (
              <>
                <Divider className="w-full my-1 lg:my-4" />
                <div className="flex items-center gap-2 justify-end lg:flex-col lg:gap-1">
                  <span className="text-sm text-primary/70">
                    {status === 'BEFORE_BIDDING' ? '시작까지' : '종료까지'}
                  </span>
                  <div
                    className={cn(
                      'text-lg font-bold',
                      color === 'red' && 'text-red-700',
                      color === 'gray' && 'text-gray-500',
                      color === 'yellow' && 'text-yellow-700',
                      color === 'green' && 'text-green-700',
                    )}
                    suppressHydrationWarning
                  >
                    {remainingTime} 남음
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PageToolbar>
  );
}

type Props = {
  auctionCase: AuctionCaseLike | null;
};
