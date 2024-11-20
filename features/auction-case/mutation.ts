import { SuccessResponse } from '@/app/api/types';
import { AuctionCaseFormSchema } from '@/components/pages/AuctionCaseForm/formSchema';
import { API_ROUTE } from '@/const/paths';
import { AuctionCaseLike } from '@/features/auction-case/types';
import { getApiUrl, getQueryClient } from '@/lib/query';
import { MutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { auctionCaseQueryKeys } from './queryKey';

export const createAuctionCaseMutationOptions: MutationOptions<
  AuctionCaseLike,
  Error,
  AuctionCaseFormSchema
> = {
  mutationFn: async (data: AuctionCaseFormSchema) => {
    try {
      const url = getApiUrl(API_ROUTE.AUCTION_CASE);
      const res = await axios<SuccessResponse<AuctionCaseLike>>({
        method: 'post',
        url,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
  AuctionCaseLike,
  Error,
  AuctionCaseFormSchema
> = {
  mutationFn: async (data: AuctionCaseFormSchema) => {
    try {
      const url = getApiUrl(`${API_ROUTE.AUCTION_CASE}/${data.id}`);
      const res = await axios<SuccessResponse<AuctionCaseLike>>({
        method: 'patch',
        url,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
      queryClient.refetchQueries({
        queryKey: auctionCaseQueryKeys.detail(data.id),
      });
    }
  },
};

export const deleteAuctionCaseMutationOptions: MutationOptions<
  { auctionCaseId: string; groupId: string },
  Error,
  { auctionCaseId: string; groupId: string }
> = {
  mutationFn: async (data) => {
    try {
      const url = getApiUrl(`${API_ROUTE.AUCTION_CASE}/${data.auctionCaseId}`);
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
    if (!!data) {
      queryClient.invalidateQueries({
        queryKey: auctionCaseQueryKeys.list(data.groupId),
      });
      queryClient.invalidateQueries({
        queryKey: auctionCaseQueryKeys.detail(data.auctionCaseId),
      });
    }
  },
};
