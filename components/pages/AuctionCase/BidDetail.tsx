import DetailRow from '@/components/DetailRow';
import Divider from '@/components/ui/divider';
import { getAuctionCaseName } from '@/lib/auctionCase';
import { AuctionCaseLike } from '@/types/auctionCase';
import { BidWithUser } from '@/types/bid';

export default function BidDetail({ bid, auctionCase }: Props) {
  const auctionCaseName = getAuctionCaseName(auctionCase);
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
  } = bid ?? {};

  return (
    <div className="flex flex-col gap-2">
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
    </div>
  );
}

type Props = {
  bid: BidWithUser;
  auctionCase: AuctionCaseLike;
};
