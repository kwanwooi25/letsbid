import { BiddingFormSchema } from '@/components/pages/BiddingForm/formSchema';
import { API_ROUTE } from '@/const/paths';
import { BidExclusionFormSchema } from '@/context/FormDialog/BidExclusionForm/formSchema';
import { SuccessResponse } from '@/types/api';
import { BidWithUser } from '@/types/bid';
import { MutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { auctionCaseQueryKeys } from '../auction-case/queryKey';
import { getApiUrl, getQueryClient } from '../config';
import { bidQueryKeys } from './queryKey';

export const placeBidMutationOptions: MutationOptions<BidWithUser, Error, BiddingFormSchema> = {
  mutationFn: async (data) => {
    try {
      const url = getApiUrl(`${API_ROUTE.AUCTION_CASE}/${data.auctionCaseId}/bid`);
      const res = await axios<SuccessResponse<BidWithUser>>({
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

export const updateBidMutationOptions: MutationOptions<
  BidWithUser,
  Error,
  BiddingFormSchema | BidExclusionFormSchema
> = {
  mutationFn: async (data) => {
    try {
      const url = getApiUrl(`${API_ROUTE.BID}/${data.id}`);
      const res = await axios<SuccessResponse<BidWithUser>>({
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
  { auctionCaseId: string; bidId: string; groupId: string },
  Error,
  { auctionCaseId: string; bidId: string; groupId: string }
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
      queryClient.invalidateQueries({ queryKey: auctionCaseQueryKeys.list(data.groupId) });
      queryClient.invalidateQueries({ queryKey: auctionCaseQueryKeys.detail(data.auctionCaseId) });
      queryClient.invalidateQueries({ queryKey: bidQueryKeys.detail(data.bidId) });
    }
  },
};
