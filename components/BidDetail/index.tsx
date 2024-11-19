import DetailRow from '@/components/DetailRow';
import Divider from '@/components/ui/divider';
import { AuctionCaseLike } from '@/features/auction-case/types';
import { BidWithUser } from '@/features/bid/types';
import BidDetailSkeleton from './skeleton';

export default function BidDetail({ bid, auctionCase }: Props) {
  const { caseName } = auctionCase;
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
    isExcluded,
    excludedReason,
    user,
  } = bid ?? {};

  const totalCost =
    acquisitionCost + evacuationCost + repairCost + brokerageFee + estimatedInterest + otherCost;

  const isMockBid = isExcluded && excludedReason === '모의 입찰';

  return (
    <div className="relative flex flex-col gap-2">
      <h5 className="mb-4 text-2xl text-center font-bold">입 찰 표</h5>
      {isMockBid && (
        <span className="absolute top-0 left-0 px-2 py-1 border-2 border-yellow-600 text-yellow-600 text-sm font-semibold">
          모의 입찰
        </span>
      )}
      <DetailRow label="사건명" value={caseName} />
      <DetailRow label="입찰자" value={user.name} />

      <Divider />

      <DetailRow label="목표 매도가" value={expectedSalePrice.toLocaleString()} />

      <Divider />

      <DetailRow label="총 비용" value={totalCost.toLocaleString()} />
      <DetailRow
        label={<span className="ml-2">┗ 취득비용</span>}
        value={acquisitionCost.toLocaleString()}
      />
      <DetailRow
        label={<span className="ml-2">┗ 명도비 / 미납관리비</span>}
        value={evacuationCost.toLocaleString()}
      />
      <DetailRow
        label={<span className="ml-2">┗ 수리비용</span>}
        value={repairCost.toLocaleString()}
      />
      <DetailRow
        label={<span className="ml-2">┗ 중개수수료</span>}
        value={brokerageFee.toLocaleString()}
      />
      <DetailRow
        label={<span className="ml-2">┗ 이자비용</span>}
        value={estimatedInterest.toLocaleString()}
      />
      <DetailRow
        label={<span className="ml-2">┗ 기타비용</span>}
        value={otherCost.toLocaleString()}
      />

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

BidDetail.Skeleton = BidDetailSkeleton;

type Props = {
  bid: BidWithUser;
  auctionCase: AuctionCaseLike;
};
