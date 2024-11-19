import { API_ROUTE } from '@/const/paths';
import { SuccessResponse } from '@/app/api/types';
import { ArticleWithAuctionCaseAuthorAttachments } from '@/features/article/types';
import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { getApiUrl } from '../../lib/query';
import { articleQueryKeys } from './queryKey';

export const getAuctionCaseArticleListQueryOptions = (auctionCaseId?: string) =>
  queryOptions({
    queryKey: articleQueryKeys.list(auctionCaseId),
    queryFn: async () => {
      if (!auctionCaseId) return [];

      try {
        const url = getApiUrl(`${API_ROUTE.AUCTION_CASE}/${auctionCaseId}/article`);
        const res = await axios<SuccessResponse<ArticleWithAuctionCaseAuthorAttachments[]>>({
          method: 'get',
          url,
        });

        return res.data.data;
      } catch (error) {
        return [];
      }
    },
    enabled: !!auctionCaseId,
  });

export const getArticleDetailQueryOptions = (articleId?: string) =>
  queryOptions({
    queryKey: articleQueryKeys.detail(articleId),
    queryFn: async () => {
      if (!articleId) return null;
      try {
        const url = getApiUrl(`${API_ROUTE.ARTICLE}/${articleId}`);
        const res = await axios<SuccessResponse<ArticleWithAuctionCaseAuthorAttachments>>({
          method: 'get',
          url,
        });
        return res.data.data;
      } catch (error) {
        return null;
      }
    },
    enabled: !!articleId,
  });
