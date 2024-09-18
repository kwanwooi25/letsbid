import { BiddingFormSchema } from '@/components/pages/BiddingForm/formSchema';
import { API_ROUTE } from '@/const/paths';
import { SuccessResponse } from '@/types/api';
import { Bid } from '@prisma/client';
import { MutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { auctionCaseQueryKeys } from '../auction-case/queryKey';
import { getApiUrl, getQueryClient } from '../config';
import { bidQueryKeys } from './queryKey';

export const placeBidMutationOptions: MutationOptions<Bid, Error, BiddingFormSchema> = {
  mutationFn: async (data: BiddingFormSchema) => {
    try {
      const url = getApiUrl(`${API_ROUTE.AUCTION_CASE}/${data.auctionCaseId}/bid`);
      const res = await axios<SuccessResponse<Bid>>({
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

export const updateBidMutationOptions: MutationOptions<Bid, Error, BiddingFormSchema> = {
  mutationFn: async (data: BiddingFormSchema) => {
    try {
      const url = getApiUrl(`${API_ROUTE.BID}/${data.id}`);
      const res = await axios<SuccessResponse<Bid>>({
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
    if (data) {
      queryClient.invalidateQueries({ queryKey: auctionCaseQueryKeys.detail(data.auctionCaseId) });
      queryClient.invalidateQueries({ queryKey: bidQueryKeys.detail(data.id) });
    }
  },
};

export const deleteBidMutationOptions: MutationOptions<
  { auctionCaseId: string; bidId: string },
  Error,
  { auctionCaseId: string; bidId: string }
> = {
  mutationFn: async (data) => {
    try {
      const url = getApiUrl(`${API_ROUTE.BID}/${data.bidId}`);
      await axios<SuccessResponse<{ id: string }>>({
        method: 'delete',
        url,
      });
      return data;
    } catch (e) {
      throw e;
    }
  },
  onSettled: (data) => {
    const queryClient = getQueryClient();
    if (data) {
      queryClient.invalidateQueries({ queryKey: auctionCaseQueryKeys.detail(data.auctionCaseId) });
      queryClient.invalidateQueries({ queryKey: bidQueryKeys.detail(data.bidId) });
    }
  },
};
