import { useToast } from '@/components/ui/use-toast';
import { useAlert } from '@/context/Alert';
import { useFormDialog } from '@/context/FormDialog';
import { deleteBidMutationOptions, updateBidMutationOptions } from '@/features/bid/mutation';
import { BidWithUserAndAuctionCase } from '@/features/bid/types';
import { useAxiosError } from '@/hooks';
import { useMutation } from '@tanstack/react-query';

export function useBidActions() {
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const { openForm } = useFormDialog();
  const { handleAxiosError } = useAxiosError();

  const { mutateAsync: cancelBid } = useMutation(deleteBidMutationOptions);
  const { mutateAsync: updateBid } = useMutation(updateBidMutationOptions);

  const tryToCancelBid = (bid: BidWithUserAndAuctionCase) => {
    const { id, auctionCase } = bid;

    openAlert({
      title: '입찰 취소',
      description: '입찰을 취소하시겠습니까?',
      actionLabel: '입찰 취소',
      action: async () => {
        try {
          await cancelBid({
            auctionCaseId: auctionCase.id,
            bidId: id,
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

  const tryToExcludeBid = (bid: BidWithUserAndAuctionCase) => {
    openForm({
      type: 'BID_EXCLUSION',
      formProps: { bid },
    });
  };

  const tryToIncludeBid = (bid: BidWithUserAndAuctionCase) => {
    const { id, user } = bid;

    openAlert({
      title: '입찰 참여',
      description: '입찰 제외를 취소하고 참여 처리하시겠습니까?',
      actionLabel: '입찰 참여 처리',
      action: async () => {
        try {
          await updateBid({ id, isExcluded: false, excludedReason: '' });
          toast({
            title: user.name,
            description: '입찰 참여 처리되었습니다',
            variant: 'success',
          });
          return true;
        } catch (error) {
          handleAxiosError(error);
          return false;
        }
      },
    });
  };

  const tryToGiveUpBid = (bid: BidWithUserAndAuctionCase) => {
    const { id, user } = bid;

    openAlert({
      title: '입찰 포기',
      description: '입찰 포기 하시겠습니까?',
      actionLabel: '입찰 포기',
      action: async () => {
        try {
          await updateBid({ id, isExcluded: true, excludedReason: '입찰 포기' });
          toast({
            title: user.name,
            description: '입찰 포기되었습니다',
            variant: 'success',
          });
          return true;
        } catch (error) {
          handleAxiosError(error);
          return false;
        }
      },
    });
  };

  return {
    tryToCancelBid,
    tryToExcludeBid,
    tryToIncludeBid,
    tryToGiveUpBid,
  };
}
