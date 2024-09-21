import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useAlert } from '@/context/Alert';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { getAuctionCaseStatus } from '@/lib/auctionCase';
import { deleteBidMutationOptions } from '@/queries/bid/mutation';
import { getBidDetailQueryOptions } from '@/queries/bid/query';
import { AuctionCaseLike } from '@/types/auctionCase';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';
import BidDetail from './BidDetail';

export default function MyBid({ bidId, auctionCase }: Props) {
  const router = useRouter();
  const currentUrl = useCurrentUrl();
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const { data: bid } = useSuspenseQuery(getBidDetailQueryOptions(bidId));
  const cancelBid = useMutation(deleteBidMutationOptions);

  const status = getAuctionCaseStatus(auctionCase);

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
          await cancelBid.mutateAsync({
            auctionCaseId: auctionCase.id,
            bidId,
            groupId: auctionCase.groupId,
          });
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

  if (!bid) return null;

  return (
    <div className="w-full max-w-md mx-auto px-6 py-8 border border-primary-foreground shadow-lg">
      <BidDetail auctionCase={auctionCase} bid={bid} />

      {status === 'BIDDING' && (
        <div className="flex items-center justify-between gap-4 mt-4">
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
