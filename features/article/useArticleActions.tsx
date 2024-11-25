import { ArticleFormSchema } from '@/components/pages/ArticleForm/formSchema';
import { useToast } from '@/components/ui/use-toast';
import { useAlert } from '@/context/Alert';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useGlobalRouter } from '@/hooks/useGlobalRouter';
import { useMutation } from '@tanstack/react-query';
import {
  createArticleMutaionOptions,
  deleteArticleMutaionOptions,
  updateArticleMutaionOptions,
} from './mutation';
import { ArticleWithAuctionCaseAuthor } from './types';
import { useArticleRouter } from './useArticleRouter';

export function useArticleActions() {
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();

  const { mutateAsync: createArticleMutation } = useMutation(createArticleMutaionOptions);
  const { mutateAsync: updateArticleMutation } = useMutation(updateArticleMutaionOptions);
  const { mutateAsync: deleteArticle } = useMutation(deleteArticleMutaionOptions);

  const { moveToPreviousPage } = useGlobalRouter();
  const { moveToArticleList } = useArticleRouter();

  const createArticle = async (formValues: ArticleFormSchema) => {
    try {
      await createArticleMutation(formValues);
      toast({
        title: '조사 내용 등록 완료',
        variant: 'success',
      });
      moveToPreviousPage();
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const updateArticle = async (formValues: ArticleFormSchema) => {
    try {
      await updateArticleMutation(formValues);
      toast({
        title: '조사 내용 수정 완료',
        variant: 'success',
      });
      moveToPreviousPage();
    } catch (error) {
      handleAxiosError(error);
    }
  };

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
    createArticle,
    updateArticle,
    tryToDeleteArticle,
  };
}
