import { API_ROUTE } from '@/const/paths';
import { SuccessResponse } from '@/types/api';
import { BidWithUser } from '@/types/bid';
import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { getApiUrl } from '../config';
import { bidQueryKeys } from './queryKey';

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
