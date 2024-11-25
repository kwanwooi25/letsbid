import { useToast } from '@/components/ui/use-toast';
import { useAlert } from '@/context/Alert';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useMutation } from '@tanstack/react-query';
import { deleteArticleMutaionOptions } from '../mutation';
import { ArticleWithAuctionCaseAuthor } from '../types';
import { useArticleDetailMenuRouter } from './useArticleDetailMenuRouter';

export function useArticleDetailMenuActions() {
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();

  const { mutateAsync: deleteArticle } = useMutation(deleteArticleMutaionOptions);

  const { moveToArticleList } = useArticleDetailMenuRouter();

  const tryToDeleteArticle = (article: ArticleWithAuctionCaseAuthor) => {
    const { id, auctionCase } = article;

    openAlert({
      title: '조사 내용 삭제',
      description: '조사 내용을 삭제하시겠습니까?',
      actionLabel: '삭제',
      action: async () => {
        try {
          await deleteArticle({ auctionCase, articleId: id });
          toast({
            title: '조사 내용 삭제 완료',
            variant: 'success',
          });
          moveToArticleList(auctionCase);
          return true;
        } catch (error) {
          handleAxiosError(error);
          return false;
        }
      },
    });
  };

  return {
    tryToDeleteArticle,
  };
}
