'use client';

import { GroupFormSchema } from '@/app/group/components/GroupForm/formSchema';
import { API_ROUTE } from '@/const/paths';
import { SuccessResponse } from '@/types/api';
import { GroupWithMembers } from '@/types/group';
import { MutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { getApiUrl, getQueryClient } from '../config';
import { groupQueryKeys } from './queryKey';

export const createGroupMutationOptions: MutationOptions<GroupWithMembers, Error, GroupFormSchema> =
  {
    mutationFn: async (data: GroupFormSchema) => {
      try {
        const url = getApiUrl(API_ROUTE.GROUP);
        const res = await axios<SuccessResponse<GroupWithMembers>>({
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
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.myGroupList });
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.list });
    },
  };

export const updateGroupMutationOptions: MutationOptions<GroupWithMembers, Error, GroupFormSchema> =
  {
    mutationFn: async (data: GroupFormSchema) => {
      try {
        const url = getApiUrl(`${API_ROUTE.GROUP}/${data.id}`);
        const res = await axios<SuccessResponse<GroupWithMembers>>({
          method: 'patch',
          url,
          data,
        });
        return res.data.data;
      } catch (e) {
        throw e;
      }
    },
    onSettled: (updatedGroup) => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.myGroupList });
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.list });
      if (updatedGroup?.id) {
        queryClient.invalidateQueries({ queryKey: groupQueryKeys.detail(updatedGroup?.id) });
      }
    },
  };

export const deleteGroupMutationOptions: MutationOptions<string, Error, string> = {
  mutationFn: async (groupId: string) => {
    try {
      const url = getApiUrl(`${API_ROUTE.GROUP}/${groupId}`);
      await axios<SuccessResponse<GroupWithMembers>>({
        method: 'delete',
        url,
      });
      return groupId;
    } catch (e) {
      throw e;
    }
  },
  onSettled: () => {
    const queryClient = getQueryClient();
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.myGroupList });
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.list });
  },
};

export const joinGroupMutationOptions: MutationOptions<
  { groupId: string },
  Error,
  { groupId: string; password?: string }
> = {
  mutationFn: async (data) => {
    try {
      const url = getApiUrl(`${API_ROUTE.GROUP}/${data.groupId}/join`);
      await axios<SuccessResponse<string>>({
        method: 'post',
        url,
        data: { password: data.password },
      });
      return { groupId: data.groupId };
    } catch (e) {
      throw e;
    }
  },
  onSettled: (result) => {
    const queryClient = getQueryClient();
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.myGroupList });
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.list });
    if (result?.groupId) {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.detail(result.groupId) });
    }
  },
};

export const expelGroupMemberMutationOptions: MutationOptions<
  { memberId: string; groupId: string },
  Error,
  { memberId: string; groupId: string }
> = {
  mutationFn: async (data) => {
    try {
      const url = getApiUrl(`${API_ROUTE.GROUP}/${data.groupId}/member/${data.memberId}`);
      await axios<SuccessResponse<void>>({
        method: 'delete',
        url,
      });
      return data;
    } catch (e) {
      throw e;
    }
  },
  onSettled: (expelledUser) => {
    const queryClient = getQueryClient();
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.myGroupList });
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.list });
    if (expelledUser?.groupId) {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.detail(expelledUser.groupId) });
    }
  },
};

export const changeGroupHostMutationOptions: MutationOptions<
  GroupWithMembers,
  Error,
  { groupId: string; hostId: string }
> = {
  mutationFn: async ({ groupId, hostId }) => {
    try {
      const url = getApiUrl(`${API_ROUTE.GROUP}/${groupId}`);
      const res = await axios<SuccessResponse<GroupWithMembers>>({
        method: 'patch',
        url,
        data: { hostId },
      });
      return res.data.data;
    } catch (e) {
      throw e;
    }
  },
  onSettled: (updatedGroup) => {
    const queryClient = getQueryClient();
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.myGroupList });
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.list });
    if (updatedGroup?.id) {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.detail(updatedGroup?.id) });
    }
  },
};
