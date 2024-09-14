import { API_ROUTE } from '@/const/paths';
import type { SuccessResponse } from '@/types/api';
import type { GroupWithMembers } from '@/types/group';
import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { getApiUrl } from '../config';
import { groupQueryKeys } from './queryKey';

export const groupListQueryOptions = queryOptions({
  queryKey: groupQueryKeys.list,
  queryFn: async () => {
    const url = getApiUrl(API_ROUTE.GET_GROUPS);
    const res = await axios<SuccessResponse<GroupWithMembers[]>>({
      method: 'get',
      url,
    });
    return res.data.data;
  },
});
