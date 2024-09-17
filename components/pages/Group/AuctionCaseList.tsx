'use client';

import { Button } from '@/components/ui/button';
import { AUCTION_CASE_STATUS_LIST, AUCTION_CASE_STATUS_TRANSLATIONS } from '@/const/auctionCase';
import { useFormDialog } from '@/context/FormDialog';
import { getAuctionCaseListQueryOptions } from '@/queries/auction-case/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LucideFilePlus2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import AuctionCaseListItem from './AuctionCaseListItem';
import { useCategorizedAuctionCases } from './hooks';

export default function AuctionCaseList({ isHost }: Props) {
  const params = useParams();
  const groupId = params.groupId as string;
  const { openForm } = useFormDialog();
  const { data: auctionCases } = useSuspenseQuery(getAuctionCaseListQueryOptions(groupId));
  const categorizedAuctionCases = useCategorizedAuctionCases(auctionCases);

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

      {AUCTION_CASE_STATUS_LIST.map((auctionCaseStatus) => {
        const auctionCaseList = categorizedAuctionCases[auctionCaseStatus];
        if (!auctionCaseList?.length) return null;

        return (
          <div className="flex flex-col gap-4 mb-6">
            <h5 className="text-xl font-bold text-primary/80">
              {AUCTION_CASE_STATUS_TRANSLATIONS[auctionCaseStatus]}
            </h5>
            <ul className="flex flex-col gap-4">
              {auctionCaseList.map((auctionCase) => (
                <AuctionCaseListItem key={auctionCase.id} auctionCase={auctionCase} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

type Props = {
  isHost?: boolean;
};
