'use client';

import { useToast } from '@/components/ui/use-toast';
import { useAxiosError } from '@/hooks/useAxiosError';
import {
  createArticleMutaionOptions,
  updateArticleMutaionOptions,
} from '@/queries/article/mutation';
import { useMutation } from '@tanstack/react-query';
import { ArticleFormSchema } from './formSchema';
import { useArticleFormRouter } from './useArticleFormRouter';

export function useArticleFormActions() {
  const { toast } = useToast();
  const { mutateAsync: createArticleMutation } = useMutation(createArticleMutaionOptions);
  const { mutateAsync: updateArticleMutation } = useMutation(updateArticleMutaionOptions);

  const { handleAxiosError } = useAxiosError();

  const { moveToPreviousPage } = useArticleFormRouter();

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

  return {
    createArticle,
    updateArticle,
  };
}
