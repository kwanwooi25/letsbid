import { API_ROUTE } from '@/const/paths';
import { SuccessResponse } from '@/types/api';
import { AuctionCaseLike } from '@/types/auctionCase';
import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { getApiUrl } from '../config';
import { auctionCaseQueryKeys } from './queryKey';

export const getAuctionCaseListQueryOptions = (groupId: string) =>
  queryOptions({
    queryKey: auctionCaseQueryKeys.list(groupId),
    queryFn: async () => {
      const url = getApiUrl(`${API_ROUTE.AUCTION_CASE}?groupId=${groupId}`);
      const res = await axios<SuccessResponse<AuctionCaseLike[]>>({
        method: 'get',
        url,
      });
      return res.data.data;
    },
    staleTime: 1000 * 60,
  });

export const getAuctionCaseDetailQueryOptions = (auctionCaseId: string) =>
  queryOptions({
    queryKey: auctionCaseQueryKeys.detail(auctionCaseId),
    queryFn: async () => {
      const url = getApiUrl(`${API_ROUTE.AUCTION_CASE}/${auctionCaseId}`);
      const res = await axios<SuccessResponse<AuctionCaseLike>>({
        method: 'get',
        url,
      });
      return res.data.data;
    },
    enabled: !!auctionCaseId,
  });
