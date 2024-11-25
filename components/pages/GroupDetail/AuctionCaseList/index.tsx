'use client';

import List from '@/components/common/List';
import ListEmpty from '@/components/common/ListEmpty';
import Pagination from '@/components/common/Pagination';
import { useCurrentPage } from '@/components/common/Pagination/useCurrentPage';
import { useSearchInput } from '@/components/common/SearchInput/useSearchInput';
import { Button } from '@/components/ui/button';
import { AUCTION_CASE_STATUS_LIST } from '@/features/auction-case/const';
import { getAuctionCaseListQueryOptions } from '@/features/auction-case/query';
import { useCalibrateCurrentPage } from '@/hooks/useCalibrateCurrentPage';
import { useSuspenseQuery } from '@tanstack/react-query';
import { LucideFilePlus2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useGroupDetailRouter } from '../useGroupDetailRouter';
import AuctionCaseListItem from './ListItem';
import { useCategorizedAuctionCases } from './useCategorizedAuctionCases';

export default function AuctionCaseList({ isAbleToCreateAuctionCase }: Props) {
  const params = useParams();
  const groupId = params.groupId as string;
  const { currentPage } = useCurrentPage();
  const { search } = useSearchInput();
  const { moveToCreateAuctionCase } = useGroupDetailRouter();
  const { data, isPending } = useSuspenseQuery(
    getAuctionCaseListQueryOptions(groupId, { page: currentPage, search }),
  );
  const { data: auctionCases, meta } = data;
  const categorizedAuctionCases = useCategorizedAuctionCases(auctionCases);
  const isEmpty = !isPending && !auctionCases?.length;

  useCalibrateCurrentPage(!auctionCases.length);

  if (isEmpty) {
    return (
      <ListEmpty className="flex flex-col gap-4">
        <p>표시할 경매 사건이 없습니다</p>
        {isAbleToCreateAuctionCase && (
          <p>
            <Button className="self-end" onClick={moveToCreateAuctionCase}>
              <LucideFilePlus2 className="w-4 h-4 mr-2" />
              경매 사건 추가
            </Button>{' '}
            버튼을 눌러 사건을 추가해주세요
          </p>
        )}
      </ListEmpty>
    );
  }

  return (
    <>
      <List>
        {AUCTION_CASE_STATUS_LIST.map((auctionCaseStatus) => {
          const auctionCaseList = categorizedAuctionCases[auctionCaseStatus];
          if (!auctionCaseList?.length) return null;

          return auctionCaseList.map((auctionCase) => (
            <AuctionCaseListItem key={auctionCase.id} auctionCase={auctionCase} />
          ));
        })}
      </List>
      {!isEmpty && typeof meta?.totalPages === 'number' && meta.totalPages > 1 && (
        <Pagination lastPage={meta.totalPages} />
      )}
    </>
  );
}

type Props = {
  isAbleToCreateAuctionCase?: boolean;
};
