'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useIsGroupHost } from '@/hooks/useIsGroupHost';
import { getAuctionCaseStatus } from '@/lib/auctionCase';
import { getAuctionCaseDetailQueryOptions } from '@/queries/auction-case/query';
import { getGroupDetailQueryOptions } from '@/queries/group/query';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import ArticleList from './Articles';
import AuctionCaseTitle from './AuctionCaseTitle';
import AuctionCaseBids from './Bids';
import AuctionCaseIntroduction from './Introduction';
import AuctionCaseSkeleton from './skeleton';
import AucitonCasePageToolbar from './Toolbar';
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
  const { isGroupHost } = useIsGroupHost(group.hostId);
  const [status, setStatus] = useState(getAuctionCaseStatus(auctionCase));

  const { tab, handleTabChange } = useAuctionCaseDetailTabs();
  const { moveToGroupDetail, moveToEditAuctionCase } = useAuctionCaseDetailRouter({ auctionCase });
  const { tryToDeleteAuctionCase } = useAuctionCaseDetailActions({ auctionCase });

  useInterval(() => {
    setStatus(getAuctionCaseStatus(auctionCase));
  }, 1000);

  useEffect(() => {
    if (status === 'FINISHED_BIDDING') refetchAuctionCase();
  }, [status, refetchAuctionCase]);

  if (!auctionCase) return <AuctionCaseSkeleton />;

  return (
    <Tabs defaultValue={tab} value={tab} onValueChange={handleTabChange}>
      <PageHeader
        className="max-w-2xl min-h-[80px]"
        backButton
        onBackButtonClick={moveToGroupDetail}
        title={<AuctionCaseTitle auctionCase={auctionCase} />}
      >
        {isGroupHost && (
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
      <PageBody className="max-w-2xl flex flex-col gap-4 lg:max-w-5xl lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-8 lg:items-start">
        <AucitonCasePageToolbar auctionCase={auctionCase} />
        <TabsContent value="introduction" className="py-4 mt-0 lg:py-0">
          <AuctionCaseIntroduction auctionCase={auctionCase} />
        </TabsContent>
        <TabsContent value="articles" className="py-4 mt-0 lg:py-0">
          <ArticleList auctionCase={auctionCase} />
        </TabsContent>
        <TabsContent value="bids" className="py-4 mt-0 lg:py-0 flex flex-col items-center">
          <AuctionCaseBids auctionCase={auctionCase} isGroupHost={isGroupHost} />
        </TabsContent>
      </PageBody>
    </Tabs>
  );
}
