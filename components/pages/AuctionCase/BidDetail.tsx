import DetailRow from '@/components/DetailRow';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { PATHS } from '@/const/paths';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { getAuctionCaseName, getAuctionCaseStatus } from '@/lib/auctionCase';
import { getBidDetailQueryOptions } from '@/queries/bid/query';
import { AuctionCaseLike } from '@/types/auctionCase';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function BidDetail({ bidId, auctionCase }: Props) {
  const router = useRouter();
  const currentUrl = useCurrentUrl();
  const { data: bid } = useSuspenseQuery(getBidDetailQueryOptions(bidId));
  const {
    expectedSalePrice,
    acquisitionCost,
    evacuationCost,
    repairCost,
    brokerageFee,
    estimatedInterest,
    otherCost,
    expectedProfit,
    biddingPrice,
    user,
  } = bid;
  const auctionCaseStatus = getAuctionCaseStatus(auctionCase);
  const auctionCaseName = getAuctionCaseName(auctionCase);

  const handleClickEditBid = () => {
    router.push(
      `${PATHS.GROUP}/${auctionCase.groupId}${PATHS.AUCTION_CASE}/${auctionCase.id}${PATHS.BID}/${bidId}/edit?callbackUrl=${currentUrl}`,
    );
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-8 flex flex-col gap-2 border border-primary-foreground shadow-lg">
      <h5 className="mb-4 text-2xl text-center font-bold">입 찰 표</h5>
      <DetailRow label="사건 번호" value={auctionCaseName} />
      <DetailRow label="입찰자" value={user.name} />

      <Divider />

      <DetailRow label="목표 매도가" value={expectedSalePrice.toLocaleString()} />

      <Divider />

      <DetailRow label="취득비용" value={acquisitionCost.toLocaleString()} />
      <DetailRow label="명도비 / 미납관리비" value={evacuationCost.toLocaleString()} />
      <DetailRow label="수리비용" value={repairCost.toLocaleString()} />
      <DetailRow label="중개수수료" value={brokerageFee.toLocaleString()} />
      <DetailRow label="이자비용" value={estimatedInterest.toLocaleString()} />
      <DetailRow label="기타비용" value={otherCost.toLocaleString()} />

      <Divider />

      <DetailRow
        label="기대수익"
        value={expectedProfit.toLocaleString()}
        valueClassName="text-blue-500"
      />

      <Divider />

      <DetailRow
        label="입찰가"
        value={biddingPrice.toLocaleString()}
        valueClassName="text-red-500"
      />

      {auctionCaseStatus === 'BIDDING' && (
        <Button className="mt-4" variant="outline" onClick={handleClickEditBid}>
          입찰표 수정
        </Button>
      )}
    </div>
  );
}

type Props = {
  bidId: string;
  auctionCase: AuctionCaseLike;
};
