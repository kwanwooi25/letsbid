'use client';

import ListEmpty from '@/components/ListEmpty';
import { Button } from '@/components/ui/button';
import { AUCTION_CASE_STATUS_LIST, AUCTION_CASE_STATUS_TRANSLATIONS } from '@/const/auctionCase';
import { PATHS } from '@/const/paths';
import { AuctionCaseLike } from '@/types/auctionCase';
import { LucideFilePlus2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import AuctionCaseListItem from './AuctionCaseListItem';
import { useCategorizedAuctionCases } from './hooks';

export default function AuctionCaseList({ isGroupHost, auctionCases }: Props) {
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;
  const categorizedAuctionCases = useCategorizedAuctionCases(auctionCases);
  const isEmpty = Object.values(categorizedAuctionCases).every((list) => !list.length);

  const handleClickAddCase = () => {
    router.push(`${PATHS.GROUP}/${groupId}${PATHS.CREATE_AUCTION_CASE}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      {isGroupHost && (
        <Button className="self-end" onClick={handleClickAddCase}>
          <LucideFilePlus2 className="w-4 h-4 mr-2" />
          경매 사건 추가
        </Button>
      )}

      {AUCTION_CASE_STATUS_LIST.map((auctionCaseStatus) => {
        const auctionCaseList = categorizedAuctionCases[auctionCaseStatus];
        if (!auctionCaseList?.length) return null;

        return (
          <div className="flex flex-col gap-4 mb-6" key={auctionCaseStatus}>
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

      {isEmpty && (
        <ListEmpty className="flex flex-col gap-4">
          <p>표시할 경매 사건이 없습니다</p>
          {isGroupHost && (
            <p>
              <Button className="self-end" onClick={handleClickAddCase}>
                <LucideFilePlus2 className="w-4 h-4 mr-2" />
                경매 사건 추가
              </Button>{' '}
              버튼을 눌러 사건을 추가해주세요
            </p>
          )}
        </ListEmpty>
      )}
    </div>
  );
}

type Props = {
  isGroupHost?: boolean;
  auctionCases: AuctionCaseLike[];
};
