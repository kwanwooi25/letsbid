'use client';

import { Button } from '@/components/ui/button';
import { useFormDialog } from '@/context/FormDialog';
import { getAuctionCaseListQueryOptions } from '@/queries/auction-case/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LucideFilePlus2 } from 'lucide-react';
import AuctionCaseListItem from './AuctionCaseListItem';
import { useCategorizedAuctionCases } from './hooks';

export default function AuctionCaseList({ isHost, groupId }: Props) {
  const { openForm } = useFormDialog();
  const { data: auctionCases } = useSuspenseQuery(getAuctionCaseListQueryOptions(groupId));
  const {
    bidding = [],
    beforeBidding = [],
    finishedBidding = [],
  } = useCategorizedAuctionCases(auctionCases);

  const handleClickAddCase = () => {
    openForm({ type: 'AUCTION_CASE', formProps: { groupId } });
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      {isHost && (
        <Button className="self-end" onClick={handleClickAddCase}>
          <LucideFilePlus2 className="w-4 h-4 mr-2" />
          경매 사건 추가
        </Button>
      )}

      {!!bidding.length && (
        <div className="flex flex-col gap-4 mb-6">
          <h5 className="text-xl font-bold text-primary/80">입찰 중 사건</h5>
          <ul className="flex flex-col gap-4">
            {bidding.map((auctionCase) => (
              <AuctionCaseListItem
                key={auctionCase.id}
                auctionCase={auctionCase}
                status="BIDDING"
              />
            ))}
          </ul>
        </div>
      )}

      {!!beforeBidding.length && (
        <div className="flex flex-col gap-4 mb-6">
          <h5 className="text-xl font-bold text-primary/80">입찰 예정 사건</h5>
          <ul className="flex flex-col gap-4">
            {beforeBidding.map((auctionCase) => (
              <AuctionCaseListItem
                key={auctionCase.id}
                auctionCase={auctionCase}
                status="BEFORE_BIDDING"
              />
            ))}
          </ul>
        </div>
      )}

      {!!finishedBidding.length && (
        <div className="flex flex-col gap-4 mb-6">
          <h5 className="text-xl font-bold text-primary/80">입찰 종료 사건</h5>
          <ul className="flex flex-col gap-4">
            {finishedBidding.map((auctionCase) => (
              <AuctionCaseListItem
                key={auctionCase.id}
                auctionCase={auctionCase}
                status="FINISHED_BIDDING"
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

type Props = {
  isHost?: boolean;
  groupId: string;
};
