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
    const url = getApiUrl(API_ROUTE.GROUP);
    const res = await axios<SuccessResponse<GroupWithMembers[]>>({
      method: 'get',
      url,
    });
    return res.data.data;
  },
});

export const getGroupDetailQueryOptions = (groupId: string) =>
  queryOptions({
    queryKey: groupQueryKeys.detail(groupId),
    queryFn: async () => {
      const url = getApiUrl(`${API_ROUTE.GROUP}/${groupId}`);
      const res = await axios<SuccessResponse<GroupWithMembers>>({
        method: 'get',
        url,
      });
      return res.data.data;
    },
  });
