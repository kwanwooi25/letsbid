import { API_ROUTE } from '@/const/paths';
import { SuccessResponse } from '@/types/api';
import { AuctionCase } from '@prisma/client';
import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { getApiUrl } from '../config';
import { auctionCaseQueryKeys } from './queryKey';

export const getAuctionCaseListQueryOptions = (groupId: string) =>
  queryOptions({
    queryKey: auctionCaseQueryKeys.list(groupId),
    queryFn: async () => {
      const url = getApiUrl(`${API_ROUTE.AUCTION_CASE}/${groupId}`);
      const res = await axios<SuccessResponse<AuctionCase[]>>({
        method: 'get',
        url,
      });
      return res.data.data;
    },
  });
