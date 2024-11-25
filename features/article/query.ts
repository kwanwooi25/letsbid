import { SuccessResponse } from '@/app/api/types';
import { API_ROUTE } from '@/const/paths';
import { ArticleWithAuctionCaseAuthor } from '@/features/article/types';
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
        const res = await axios<SuccessResponse<ArticleWithAuctionCaseAuthor[]>>({
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
        const res = await axios<SuccessResponse<ArticleWithAuctionCaseAuthor>>({
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

export const getLikesOnArticleQueryOptions = (articleId?: string) =>
  queryOptions({
    queryKey: articleQueryKeys.likes(articleId),
    queryFn: async () => {
      if (!articleId) return null;
      try {
        const url = getApiUrl(`${API_ROUTE.ARTICLE}/${articleId}/like`);
        const res = await axios<SuccessResponse<{ totalLikeCount: number; isMeLiked: boolean }>>({
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

export const getViewsOnArticleQueryOptions = (articleId?: string) =>
  queryOptions({
    queryKey: articleQueryKeys.views(articleId),
    queryFn: async () => {
      if (!articleId) return null;
      try {
        const url = getApiUrl(`${API_ROUTE.ARTICLE}/${articleId}/view`);
        const res = await axios<SuccessResponse<{ totalViewCount: number; isMeViewed: boolean }>>({
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
