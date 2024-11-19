import { API_ROUTE } from '@/const/paths';
import { getApiUrl } from '@/lib/query';
import { SuccessResponse } from '@/app/api/types';
import { MutationOptions } from '@tanstack/react-query';
import axios from 'axios';

export const uploadImageMutationOptions: MutationOptions<
  string,
  Error,
  { file: File; fileName?: string }
> = {
  mutationFn: async (data) => {
    try {
      const url = getApiUrl(API_ROUTE.IMAGE);
      const res = await axios<SuccessResponse<string>>({
        method: 'post',
        url,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data.data;
    } catch (error) {
      throw error;
    }
  },
};
