import { Button } from '@/components/ui/button';
import { useFormDialog } from '@/context/FormDialog';
import { getAuctionCaseListQueryOptions } from '@/queries/auction-case/query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { LucideFilePlus2 } from 'lucide-react';
import { categorizeAuctionCases } from './utils';

export default function AuctionCaseList({ isHost, groupId }: Props) {
  const { openForm } = useFormDialog();
  const { data: auctionCases } = useSuspenseQuery(getAuctionCaseListQueryOptions(groupId));

  const { bidding, beforeBidding, finishedBidding } = categorizeAuctionCases(auctionCases);

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
              <li
                className="flex flex-col gap-2 justify-between p-4 border border-primary/30 rounded-sm hover:bg-primary-foreground hover:cursor-pointer transition-colors"
                key={auctionCase.id}
              >
                <span className="text-lg font-bold">
                  {auctionCase.caseYear}타경{auctionCase.caseNumber}
                </span>
                <span className="text-sm text-primary/70 self-end">
                  {format(auctionCase.bidEndsAt, 'yyyy년 MM월 dd일 HH시 mm분')}에 입찰 종료
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!!beforeBidding.length && (
        <div className="flex flex-col gap-4 mb-6">
          <h5 className="text-xl font-bold text-primary/80">입찰 예정 사건</h5>
          <ul className="flex flex-col gap-4">
            {beforeBidding.map((auctionCase) => (
              <li
                className="flex flex-col gap-2 justify-between p-4 border border-primary/30 rounded-sm hover:bg-primary-foreground hover:cursor-pointer transition-colors"
                key={auctionCase.id}
              >
                <span className="text-lg font-bold">
                  {auctionCase.caseYear}타경{auctionCase.caseNumber}
                </span>
                <span className="text-sm text-primary/70 self-end">
                  {format(auctionCase.bidStartsAt, 'yyyy년 MM월 dd일 HH시 mm분')}에 입찰 시작
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!!finishedBidding.length && (
        <div className="flex flex-col gap-4 mb-6">
          <h5 className="text-xl font-bold text-primary/80">입찰 종료 사건</h5>
          <ul className="flex flex-col gap-4">
            {finishedBidding.map((auctionCase) => (
              <li
                className="flex flex-col gap-2 justify-between p-4 border border-primary/30 rounded-sm hover:bg-primary-foreground hover:cursor-pointer transition-colors"
                key={auctionCase.id}
              >
                <span className="text-lg font-bold">
                  {auctionCase.caseYear}타경{auctionCase.caseNumber}
                </span>
                <span className="text-sm text-primary/70 self-end">입찰 종료</span>
              </li>
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
