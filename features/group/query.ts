import { API_ROUTE } from '@/const/paths';
import { getApiUrl } from '@/lib/query';
import type { SuccessResponse } from '@/app/api/types';
import type {
  GroupListQueryOptions,
  GroupWithMembers,
  GroupWithMembersAsUsers,
} from '@/features/group/types';
import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { groupQueryKeys } from './queryKey';

export const getJoinedGroupListQueryOptions = (options: GroupListQueryOptions) =>
  queryOptions({
    queryKey: groupQueryKeys.joined(options),
    queryFn: async () => {
      const url = getApiUrl(API_ROUTE.JOINED_GROUP_LIST);
      const res = await axios<SuccessResponse<GroupWithMembers[]>>({
        method: 'post',
        url,
        data: options,
      });
      return res.data;
    },
  });

export const getGroupListQueryOptions = queryOptions({
  queryKey: groupQueryKeys.list('all'),
  queryFn: async () => {
    const url = getApiUrl(API_ROUTE.GROUP);
    const res = await axios<SuccessResponse<GroupWithMembers[]>>({
      method: 'get',
      url,
    });
    return res.data.data;
  },
});

export const getArchivedGroupListQueryOptions = queryOptions({
  queryKey: groupQueryKeys.list('archived'),
  queryFn: async () => {
    const url = getApiUrl(API_ROUTE.ARCHIVED_GROUP);
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
      const res = await axios<SuccessResponse<GroupWithMembersAsUsers>>({
        method: 'get',
        url,
      });
      return res.data.data;
    },
  });
