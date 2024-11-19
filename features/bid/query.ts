import { SuccessResponse } from '@/app/api/types';
import { API_ROUTE } from '@/const/paths';
import { getApiUrl } from '@/lib/query';
import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { bidQueryKeys } from './queryKey';
import { BidWithUser, BidWithUserAndAuctionCase } from './types';

export const getBidDetailQueryOptions = (bidId?: string) =>
  queryOptions({
    queryKey: bidQueryKeys.detail(bidId),
    queryFn: async () => {
      const url = getApiUrl(`${API_ROUTE.BID}/${bidId}`);
      const res = await axios<SuccessResponse<BidWithUser>>({
        method: 'get',
        url,
      });
      return res.data.data;
    },
  });

export const getMyBidHistoryQueryOptions = (userId?: string) =>
  queryOptions({
    queryKey: bidQueryKeys.history(userId),
    queryFn: async () => {
      const url = getApiUrl(API_ROUTE.BID);
      const res = await axios<SuccessResponse<BidWithUserAndAuctionCase[]>>({
        method: 'get',
        url,
      });
      return res.data.data;
    },
  });
