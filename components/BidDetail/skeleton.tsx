import DetailRow from '@/components/DetailRow';
import Divider from '@/components/ui/divider';

export default function BidDetailSkeleton() {
  return (
    <div className="relative flex flex-col gap-2">
      <h5 className="mb-4 text-2xl text-center font-bold">입 찰 표</h5>
      <DetailRow.Skeleton label="사건명" />
      <DetailRow.Skeleton label="입찰자" />

      <Divider />

      <DetailRow.Skeleton label="목표 매도가" />

      <Divider />

      <DetailRow.Skeleton label="총 비용" />
      <DetailRow.Skeleton label={<span className="ml-2">┗ 취득비용</span>} />
      <DetailRow.Skeleton label={<span className="ml-2">┗ 명도비 / 미납관리비</span>} />
      <DetailRow.Skeleton label={<span className="ml-2">┗ 수리비용</span>} />
      <DetailRow.Skeleton label={<span className="ml-2">┗ 중개수수료</span>} />
      <DetailRow.Skeleton label={<span className="ml-2">┗ 이자비용</span>} />
      <DetailRow.Skeleton label={<span className="ml-2">┗ 기타비용</span>} />

      <Divider />

      <DetailRow.Skeleton label="기대수익" />

      <Divider />

      <DetailRow.Skeleton label="입찰가" />
    </div>
  );
}
