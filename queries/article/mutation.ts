import { ArticleFormSchema } from '@/components/pages/ArticleForm/formSchema';
import { API_ROUTE } from '@/const/paths';
import { SuccessResponse } from '@/types/api';
import { Article } from '@prisma/client';
import { MutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { auctionCaseQueryKeys } from '../auction-case/queryKey';
import { getApiUrl, getQueryClient } from '../config';

export const createArticleMutaionOptions: MutationOptions<Article, Error, ArticleFormSchema> = {
  mutationFn: async (data) => {
    try {
      const url = getApiUrl(`${API_ROUTE.AUCTION_CASE}/${data.auctionCaseId}/article`);
      const res = await axios<SuccessResponse<Article>>({
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
      queryClient.invalidateQueries({ queryKey: auctionCaseQueryKeys.detail(data.auctionCaseId) });
    }
  },
};
