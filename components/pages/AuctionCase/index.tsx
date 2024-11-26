'use client';

import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import AuctionCaseMenu from '@/features/auction-case/AuctionCaseMenu';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { getAuctionCaseStatus } from '@/features/auction-case/utils';
import { useGroupRouter } from '@/features/group/useGroupRouter';
import { useIsGroupMember } from '@/features/group/useIsGroupMember';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { cn } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import ArticleList from './Articles';
import ArticleListSkeleton from './Articles/skeleton';
import AuctionCaseTitle from './AuctionCaseTitle';
import AuctionCaseBids from './Bids';
import AuctionCaseIntroduction from './Introduction';
import AuctionCaseSkeleton from './skeleton';
import AuctionCasePageToolbar from './Toolbar';
import { useAuctionCaseDetailTabs } from './useAuctionCaseDetailTabs';

export default function AuctionCase() {
  const params = useParams();
  const auctionCaseId = params.auctionCaseId as string;
  const { data: auctionCase, refetch: refetchAuctionCase } = useSuspenseQuery(
    getAuctionCaseDetailQueryOptions(auctionCaseId),
  );
  const { isGroupMember } = useIsGroupMember(auctionCase?.group);
  const [status, setStatus] = useState(getAuctionCaseStatus(auctionCase));
  const { isScrolled } = useWindowScroll();

  const { tab, handleTabChange } = useAuctionCaseDetailTabs();
  const { moveToGroupDetail } = useGroupRouter();

  useInterval(() => {
    setStatus(getAuctionCaseStatus(auctionCase));
  }, 1000);

  useEffect(() => {
    if (status === 'FINISHED_BIDDING') refetchAuctionCase();
  }, [status, refetchAuctionCase]);

  if (!isGroupMember) return null;

  if (!auctionCase) return <AuctionCaseSkeleton />;

  return (
    <Tabs
      className="max-w-2xl lg:max-w-5xl mx-auto"
      defaultValue={tab}
      value={tab}
      onValueChange={(value) => handleTabChange(value as typeof tab)}
    >
      <PageHeader
        className={cn('max-w-2xl min-h-[80px] lg:mx-[176px]')}
        backButton
        onBackButtonClick={() => moveToGroupDetail(auctionCase.groupId)}
        title={<AuctionCaseTitle auctionCase={auctionCase} />}
        hideBottomBorderOnScroll
      >
        <AuctionCaseMenu auctionCase={auctionCase} />
      </PageHeader>
      <PageBody className="w-full pt-0 lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-4 lg:items-start">
        <div
          className={cn(
            'bg-background -mx-4 px-4 pt-1 pb-4 sticky z-header top-[140px] lg:mx-0 lg:px-0',
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
            <Suspense fallback={<ArticleListSkeleton />}>
              <ArticleList auctionCase={auctionCase} />
            </Suspense>
          </TabsContent>
          <TabsContent value="bids" className="py-0 mt-0 flex flex-col items-center">
            <AuctionCaseBids auctionCase={auctionCase} />
          </TabsContent>
        </div>
      </PageBody>
    </Tabs>
  );
}
