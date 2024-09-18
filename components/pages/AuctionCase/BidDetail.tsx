import DetailRow from '@/components/DetailRow';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useAlert } from '@/context/Alert';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { getAuctionCaseName, getAuctionCaseStatus } from '@/lib/auctionCase';
import { deleteBidMutationOptions } from '@/queries/bid/mutation';
import { getBidDetailQueryOptions } from '@/queries/bid/query';
import { AuctionCaseLike } from '@/types/auctionCase';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

export default function BidDetail({ bidId, auctionCase }: Props) {
  const router = useRouter();
  const currentUrl = useCurrentUrl();
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const { data: bid } = useSuspenseQuery(getBidDetailQueryOptions(bidId));
  const cancelBid = useMutation(deleteBidMutationOptions);

  const auctionCaseName = getAuctionCaseName(auctionCase);
  const status = getAuctionCaseStatus(auctionCase);
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

  const handleClickEditBid = () => {
    router.push(
      `${PATHS.GROUP}/${auctionCase.groupId}${PATHS.AUCTION_CASE}/${auctionCase.id}${PATHS.BID}/${bidId}/edit?callbackUrl=${currentUrl}`,
    );
  };

  const handleClickCancelBid: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] = (e) => {
    e.stopPropagation();
    openAlert({
      title: '입찰 취소',
      description: <>입찰을 취소하시겠습니까?</>,
      actionLabel: '입찰 취소',
      action: async () => {
        try {
          await cancelBid.mutateAsync({ auctionCaseId: auctionCase.id, bidId });
          toast({
            description: '입찰을 취소했습니다',
            variant: 'success',
          });
        } catch (error) {
          handleAxiosError(error);
        }
      },
    });
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

      {status === 'BIDDING' && (
        <div className="flex items-center justify-between gap-4">
          <Button className="mt-4" variant="outline" onClick={handleClickEditBid}>
            입찰표 수정
          </Button>
          <Button className="mt-4" variant="destructive" onClick={handleClickCancelBid}>
            입찰 취소
          </Button>
        </div>
      )}
    </div>
  );
}

type Props = {
  bidId: string;
  auctionCase: AuctionCaseLike;
};
