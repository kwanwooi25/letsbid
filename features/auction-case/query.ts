import { SuccessResponse } from '@/app/api/types';
import { API_ROUTE } from '@/const/paths';
import { AuctionCaseLike, AuctionCaseListQueryOptions } from '@/features/auction-case/types';
import { getApiUrl } from '@/lib/query';
import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { auctionCaseQueryKeys } from './queryKey';

export const getAuctionCaseListQueryOptions = (
  groupId: string,
  options: AuctionCaseListQueryOptions,
) =>
  queryOptions({
    queryKey: auctionCaseQueryKeys.list(groupId, options),
    queryFn: async () => {
      const url = getApiUrl(`${API_ROUTE.AUCTION_CASE_LIST}?groupId=${groupId}`);
      const res = await axios<SuccessResponse<AuctionCaseLike[]>>({
        method: 'post',
        url,
        data: options,
      });
      return res.data;
    },
    staleTime: 1000 * 60,
  });

export const getAuctionCaseDetailQueryOptions = (auctionCaseId?: string) =>
  queryOptions({
    queryKey: auctionCaseQueryKeys.detail(auctionCaseId),
    queryFn: async () => {
      if (!auctionCaseId) return null;
      try {
        const url = getApiUrl(`${API_ROUTE.AUCTION_CASE}/${auctionCaseId}`);
        const res = await axios<SuccessResponse<AuctionCaseLike>>({
          method: 'get',
          url,
        });
        return res.data.data;
      } catch (error) {
        return null;
      }
    },
    enabled: !!auctionCaseId,
  });
