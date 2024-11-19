'use client';

import { GroupFormSchema } from '@/components/pages/GroupForm/formSchema';
import { API_ROUTE } from '@/const/paths';
import { getApiUrl, getQueryClient } from '@/lib/query';
import { SuccessResponse } from '@/app/api/types';
import { GroupWithMembers } from '@/features/group/types';
import { MutationOptions } from '@tanstack/react-query';
import axios from 'axios';
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
      queryClient.invalidateQueries({ queryKey: ['groups'] });
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
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      if (updatedGroup?.id) {
        queryClient.invalidateQueries({ queryKey: groupQueryKeys.detail(updatedGroup?.id) });
      }
    },
  };

export const archiveGroupMutationOptions: MutationOptions<GroupWithMembers, Error, string> = {
  mutationFn: async (groupId) => {
    try {
      const url = getApiUrl(`${API_ROUTE.GROUP}/${groupId}`);
      const res = await axios<SuccessResponse<GroupWithMembers>>({
        method: 'patch',
        url,
        data: {
          archivedAt: new Date(),
        },
      });
      return res.data.data;
    } catch (e) {
      throw e;
    }
  },
  onSettled: (updatedGroup) => {
    const queryClient = getQueryClient();
    queryClient.invalidateQueries({ queryKey: ['groups'] });
    if (updatedGroup?.id) {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.detail(updatedGroup?.id) });
    }
  },
};
export const unarchiveGroupMutationOptions: MutationOptions<GroupWithMembers, Error, string> = {
  mutationFn: async (groupId) => {
    try {
      const url = getApiUrl(`${API_ROUTE.GROUP}/${groupId}`);
      const res = await axios<SuccessResponse<GroupWithMembers>>({
        method: 'patch',
        url,
        data: {
          archivedAt: null,
        },
      });
      return res.data.data;
    } catch (e) {
      throw e;
    }
  },
  onSettled: (updatedGroup) => {
    const queryClient = getQueryClient();
    queryClient.invalidateQueries({ queryKey: ['groups'] });
    if (updatedGroup?.id) {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.detail(updatedGroup?.id) });
    }
  },
};

export const deleteGroupMutationOptions: MutationOptions<string, Error, string> = {
  mutationFn: async (groupId) => {
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
    queryClient.invalidateQueries({ queryKey: ['groups'] });
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
    queryClient.invalidateQueries({ queryKey: ['groups'] });
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
    queryClient.invalidateQueries({ queryKey: ['groups'] });
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
    queryClient.invalidateQueries({ queryKey: ['groups'] });
    if (updatedGroup?.id) {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.detail(updatedGroup?.id) });
    }
  },
};
