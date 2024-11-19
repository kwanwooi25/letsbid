import { ArticleFormSchema } from '@/components/pages/ArticleForm/formSchema';
import { API_ROUTE } from '@/const/paths';
import { getApiUrl, getQueryClient } from '@/lib/query';
import { SuccessResponse } from '@/app/api/types';
import { ArticleWithAuctionCaseAuthorAttachments } from '@/features/article/types';
import { MutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { auctionCaseQueryKeys } from '../auction-case/queryKey';
import { articleQueryKeys } from './queryKey';

export const createArticleMutaionOptions: MutationOptions<
  ArticleWithAuctionCaseAuthorAttachments,
  Error,
  ArticleFormSchema
> = {
  mutationFn: async (data) => {
    try {
      const url = getApiUrl(`${API_ROUTE.AUCTION_CASE}/${data.auctionCaseId}/article`);
      const res = await axios<SuccessResponse<ArticleWithAuctionCaseAuthorAttachments>>({
        method: 'post',
        url,
        data,
      });
      return res.data.data;
    } catch (e) {
      throw e;
    }
  },
  onSettled: (data) => {
    const queryClient = getQueryClient();
    if (data?.auctionCaseId) {
      queryClient.invalidateQueries({ queryKey: articleQueryKeys.list(data.auctionCaseId) });
      queryClient.invalidateQueries({ queryKey: auctionCaseQueryKeys.detail(data.auctionCaseId) });
    }
  },
};

export const updateArticleMutaionOptions: MutationOptions<
  ArticleWithAuctionCaseAuthorAttachments,
  Error,
  ArticleFormSchema
> = {
  mutationFn: async (data) => {
    try {
      const url = getApiUrl(`${API_ROUTE.ARTICLE}/${data.id}`);
      const res = await axios<SuccessResponse<ArticleWithAuctionCaseAuthorAttachments>>({
        method: 'patch',
        url,
        data,
      });
      return res.data.data;
    } catch (e) {
      throw e;
    }
  },
  onSettled: (data) => {
    const queryClient = getQueryClient();
    if (data?.auctionCaseId) {
      queryClient.invalidateQueries({ queryKey: articleQueryKeys.list(data.auctionCaseId) });
      queryClient.invalidateQueries({ queryKey: auctionCaseQueryKeys.detail(data.auctionCaseId) });
    }
    queryClient.invalidateQueries({ queryKey: articleQueryKeys.detail(data?.id) });
  },
};

export const deleteArticleMutaionOptions: MutationOptions<
  { auctionCaseId?: string | null; articleId: string },
  Error,
  { auctionCaseId?: string | null; articleId: string }
> = {
  mutationFn: async (data) => {
    try {
      const url = getApiUrl(`${API_ROUTE.ARTICLE}/${data.articleId}`);
      await axios<SuccessResponse<{ id: string }>>({
        method: 'delete',
        url,
      });
      return data;
    } catch (e) {
      throw e;
    }
  },
  onSettled: (data) => {
    const queryClient = getQueryClient();
    if (data?.auctionCaseId) {
      queryClient.invalidateQueries({ queryKey: articleQueryKeys.list(data.auctionCaseId) });
      queryClient.invalidateQueries({ queryKey: auctionCaseQueryKeys.detail(data.auctionCaseId) });
    }
  },
};
