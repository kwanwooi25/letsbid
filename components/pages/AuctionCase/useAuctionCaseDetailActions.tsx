import { useToast } from '@/components/ui/use-toast';
import { useAlert } from '@/context/Alert';
import { useFormDialog } from '@/context/FormDialog';
import { useAxiosError } from '@/hooks/useAxiosError';
import { deleteArticleMutaionOptions } from '@/queries/article/mutation';
import { deleteAuctionCaseMutationOptions } from '@/queries/auction-case/mutation';
import { deleteBidMutationOptions, updateBidMutationOptions } from '@/queries/bid/mutation';
import { ArticleWithAuctionCaseAuthorAttachments } from '@/types/article';
import { AuctionCaseLike } from '@/types/auctionCase';
import { BidWithUser } from '@/types/bid';
import { AuctionCase } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useAuctionCaseDetailRouter } from './useAuctionCaseDetailRouter';

export function useAuctionCaseDetailActions({ auctionCase }: Args) {
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const { openForm } = useFormDialog();
  const { handleAxiosError } = useAxiosError();

  const { mutateAsync: deleteAuctionCase } = useMutation(deleteAuctionCaseMutationOptions);
  const { mutateAsync: cancelBid } = useMutation(deleteBidMutationOptions);
  const { mutateAsync: updateBid } = useMutation(updateBidMutationOptions);
  const { mutateAsync: deleteArticle } = useMutation(deleteArticleMutaionOptions);

  const { moveToGroupDetail, moveToArticleList } = useAuctionCaseDetailRouter({ auctionCase });

  const tryToDeleteAuctionCase = () => {
    if (!auctionCase) return;

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
          moveToGroupDetail();
          return true;
        } catch (error) {
          handleAxiosError(error);
          return false;
        }
      },
    });
  };

  const tryToCancelBid = (bidId: string) => {
    if (!auctionCase) return;

    openAlert({
      title: '입찰 취소',
      description: '입찰을 취소하시겠습니까?',
      actionLabel: '입찰 취소',
      action: async () => {
        try {
          await cancelBid({
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

  const tryToExcludeBid = (bid: BidWithUser) => {
    openForm({
      type: 'BID_EXCLUSION',
      formProps: { bid },
    });
  };

  const tryToIncludeBid = (bid: BidWithUser) => {
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

  const tryToGiveUpBid = (bid: BidWithUser) => {
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

  const tryToDeleteArticle = (article: ArticleWithAuctionCaseAuthorAttachments) => {
    const { id, auctionCaseId } = article;

    openAlert({
      title: '조사 내용 삭제',
      description: '조사 내용을 삭제하시겠습니까?',
      actionLabel: '삭제',
      action: async () => {
        try {
          await deleteArticle({ auctionCaseId, articleId: id });
          toast({
            title: '조사 내용 삭제 완료',
            variant: 'success',
          });
          moveToArticleList();
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
    tryToCancelBid,
    tryToExcludeBid,
    tryToIncludeBid,
    tryToGiveUpBid,
    tryToDeleteArticle,
  };
}

type Args = {
  auctionCase?: AuctionCaseLike | AuctionCase | null;
};
