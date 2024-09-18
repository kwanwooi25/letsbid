import { API_ROUTE } from '@/const/paths';
import { AuctionCaseFormSchema } from '@/context/FormDialog/AuctionCaseForm/formSchema';
import { SuccessResponse } from '@/types/api';
import { AuctionCase } from '@prisma/client';
import { MutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { getApiUrl, getQueryClient } from '../config';
import { auctionCaseQueryKeys } from './queryKey';

export const createAuctionCaseMutationOptions: MutationOptions<
  AuctionCase,
  Error,
  AuctionCaseFormSchema
> = {
  mutationFn: async (data: AuctionCaseFormSchema) => {
    try {
      const url = getApiUrl(API_ROUTE.AUCTION_CASE);
      const res = await axios<SuccessResponse<AuctionCase>>({
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
    if (data?.groupId) {
      queryClient.invalidateQueries({ queryKey: auctionCaseQueryKeys.list(data.groupId) });
    }
  },
};

export const updateAuctionCaseMutationOptions: MutationOptions<
  AuctionCase,
  Error,
  AuctionCaseFormSchema
> = {
  mutationFn: async (data: AuctionCaseFormSchema) => {
    try {
      const url = getApiUrl(`${API_ROUTE.AUCTION_CASE}/${data.id}`);
      const res = await axios<SuccessResponse<AuctionCase>>({
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
    if (!!data) {
      queryClient.invalidateQueries({
        queryKey: auctionCaseQueryKeys.list(data.groupId),
      });
      queryClient.invalidateQueries({
        queryKey: auctionCaseQueryKeys.detail(data.id),
      });
    }
  },
};
