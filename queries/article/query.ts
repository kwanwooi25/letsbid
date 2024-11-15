import { API_ROUTE } from '@/const/paths';
import { SuccessResponse } from '@/types/api';
import { ArticleWithAuctionCaseAuthorAttachments } from '@/types/article';
import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { getApiUrl } from '../config';
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
