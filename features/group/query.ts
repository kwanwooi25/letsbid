import type { SuccessResponse } from '@/app/api/types';
import { API_ROUTE } from '@/const/paths';
import type {
  GroupListQueryOptions,
  GroupMember,
  GroupMemberListQueryOptions,
  GroupWithMembers,
} from '@/features/group/types';
import { getApiUrl } from '@/lib/query';
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

export const getJoinableGroupListQueryOptions = (options: GroupListQueryOptions) =>
  queryOptions({
    queryKey: groupQueryKeys.joinable(options),
    queryFn: async () => {
      const url = getApiUrl(API_ROUTE.JOINABLE_GROUP_LIST);
      const res = await axios<SuccessResponse<GroupWithMembers[]>>({
        method: 'post',
        url,
        data: options,
      });
      return res.data;
    },
  });

export const getArchivedGroupListQueryOptions = (options: GroupListQueryOptions) =>
  queryOptions({
    queryKey: groupQueryKeys.archived(options),
    queryFn: async () => {
      const url = getApiUrl(API_ROUTE.ARCHIVED_GROUP);
      const res = await axios<SuccessResponse<GroupWithMembers[]>>({
        method: 'post',
        url,
        data: options,
      });
      return res.data;
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

export const getGroupMemberListQueryOptions = (
  groupId: string,
  options?: GroupMemberListQueryOptions,
) =>
  queryOptions({
    queryKey: groupQueryKeys.memberList(groupId, options),
    queryFn: async () => {
      const url = getApiUrl(`${API_ROUTE.GROUP}/${groupId}/member`);
      const res = await axios<SuccessResponse<GroupMember[]>>({
        method: 'post',
        url,
        data: options,
      });

      return res.data;
    },
  });
