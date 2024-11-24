'use client';

import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { getAuctionCaseStatus } from '@/features/auction-case/utils';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { useIsGroupMember } from '@/features/group/useIsGroupMember';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { cn } from '@/lib/utils';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import ArticleList from './Articles';
import AuctionCaseTitle from './AuctionCaseTitle';
import AuctionCaseBids from './Bids';
import AuctionCaseIntroduction from './Introduction';
import AuctionCaseSkeleton from './skeleton';
import AuctionCasePageToolbar from './Toolbar';
import { useAuctionCaseDetailActions } from './useAuctionCaseDetailActions';
import { useAuctionCaseDetailRouter } from './useAuctionCaseDetailRouter';
import { useAuctionCaseDetailTabs } from './useAuctionCaseDetailTabs';

export default function AuctionCase() {
  const params = useParams();
  const groupId = params.groupId as string;
  const auctionCaseId = params.auctionCaseId as string;
  const [{ data: group }, { data: auctionCase, refetch: refetchAuctionCase }] = useSuspenseQueries({
    queries: [getGroupDetailQueryOptions(groupId), getAuctionCaseDetailQueryOptions(auctionCaseId)],
  });
  const { isGroupHost, isViceGroupHost, isGroupMember } = useIsGroupMember(group);
  const [status, setStatus] = useState(getAuctionCaseStatus(auctionCase));
  const { isScrolled } = useWindowScroll();

  const { tab, handleTabChange } = useAuctionCaseDetailTabs();
  const { moveToEditAuctionCase } = useAuctionCaseDetailRouter({ auctionCase });
  const { tryToDeleteAuctionCase } = useAuctionCaseDetailActions({ auctionCase });

  useInterval(() => {
    setStatus(getAuctionCaseStatus(auctionCase));
  }, 1000);

  useEffect(() => {
    if (status === 'FINISHED_BIDDING') refetchAuctionCase();
  }, [status, refetchAuctionCase]);

  if (!isGroupMember) return null;

  if (!auctionCase) return <AuctionCaseSkeleton />;

  return (
    <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange}>
      <PageHeader
        className={cn(
          'max-w-2xl sm:min-h-[80px]',
          isGroupHost || isViceGroupHost ? 'min-h-[128px]' : 'min-h-[80px]',
        )}
        backButton
        title={<AuctionCaseTitle auctionCase={auctionCase} />}
      >
        {(isGroupHost || isViceGroupHost) && (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={moveToEditAuctionCase}
              disabled={status === 'FINISHED_BIDDING'}
            >
              수정
            </Button>
            <Button type="button" variant="destructive" onClick={tryToDeleteAuctionCase}>
              삭제
            </Button>
          </div>
        )}
      </PageHeader>
      <PageBody className="max-w-2xl pt-0 lg:max-w-5xl lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-8 lg:items-start">
        <div
          className={cn(
            'bg-background -mx-4 px-4 pt-1 pb-4 sticky z-header sm:top-[140px]',
            isGroupHost || isViceGroupHost ? 'top-[188px]' : 'top-[140px]',
            isScrolled && 'border-b lg:border-none',
          )}
        >
          <AuctionCasePageToolbar auctionCase={auctionCase} />
        </div>
        <div className="pt-1">
          <TabsContent value="introduction" className="py-0 mt-0">
            <AuctionCaseIntroduction auctionCase={auctionCase} />
          </TabsContent>
          <TabsContent value="articles" className="py-0 mt-0">
            <ArticleList auctionCase={auctionCase} />
          </TabsContent>
          <TabsContent value="bids" className="py-0 mt-0 flex flex-col items-center">
            <AuctionCaseBids
              auctionCase={auctionCase}
              isGroupHost={isGroupHost}
              isViceGroupHost={isViceGroupHost}
            />
          </TabsContent>
        </div>
      </PageBody>
    </Tabs>
  );
}
