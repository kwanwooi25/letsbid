import { useToast } from '@/components/ui/use-toast';
import { useAlert } from '@/context/Alert';
import { deleteAuctionCaseMutationOptions } from '@/features/auction-case/mutation';
import { AuctionCaseLike } from '@/features/auction-case/types';
import { useGroupRouter } from '@/features/group/hooks';
import { useAxiosError } from '@/hooks';
import { useMutation } from '@tanstack/react-query';

export function useAuctionCaseActions() {
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();

  const { mutateAsync: deleteAuctionCase } = useMutation(deleteAuctionCaseMutationOptions);

  const { moveToGroupDetail } = useGroupRouter();

  const tryToDeleteAuctionCase = (auctionCase: AuctionCaseLike) => {
    const { caseName, id, groupId } = auctionCase;

    openAlert({
      title: '경매 사건 삭제',
      description: (
        <>
          경매 사건을 삭제하면
          <br />
          해당 사건의 <b className="text-destructive">모든 입찰 내역이 삭제</b>
          됩니다.
          <br />
          경매 사건 (<b>{caseName}</b>) 을 삭제하시겠습니까?
        </>
      ),
      actionLabel: '삭제',
      action: async () => {
        try {
          await deleteAuctionCase({ auctionCaseId: id, groupId });
          toast({
            title: caseName,
            description: '경매 사건이 삭제 되었습니다',
            variant: 'success',
          });
          moveToGroupDetail(groupId);
          return true;
        } catch (error) {
          handleAxiosError(error);
          return false;
        }
      },
    });
  };

  return {
    tryToDeleteAuctionCase,
  };
}
