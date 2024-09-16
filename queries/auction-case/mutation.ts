import { API_ROUTE } from '@/const/paths';
import { AuctionCaseFormSchema } from '@/context/FormDialog/AuctionCaseForm/formSchema';
import { SuccessResponse } from '@/types/api';
import { AuctionCase } from '@prisma/client';
import { MutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { getApiUrl } from '../config';

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
  onSettled: () => {
    // const queryClient = getQueryClient();
    // queryClient.invalidateQueries({ queryKey: groupQueryKeys.list });
  },
};
