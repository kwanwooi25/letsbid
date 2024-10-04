'use client';

import { API_ROUTE } from '@/const/paths';
import { GroupFormSchema } from '@/context/FormDialog/GroupForm/formSchema';
import { InvitationFormSchema } from '@/context/FormDialog/InvitationForm/formSchema';
import { SuccessResponse } from '@/types/api';
import { GroupWithMembers } from '@/types/group';
import { Invitation } from '@prisma/client';
import { MutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { getApiUrl, getQueryClient } from '../config';
import { invitationQueryKeys } from '../invitation/queryKey';
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
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.list });
  },
};

export const inviteGroupMemberMutationOptions: MutationOptions<
  Invitation,
  Error,
  InvitationFormSchema
> = {
  mutationFn: async (data: InvitationFormSchema) => {
    try {
      const url = getApiUrl(API_ROUTE.INVITATION);
      const res = await axios<SuccessResponse<Invitation>>({
        method: 'post',
        url,
        data,
      });
      return res.data.data;
    } catch (e) {
      throw e;
    }
  },
  onSettled: (createdInvitation) => {
    const queryClient = getQueryClient();
    queryClient.invalidateQueries({ queryKey: invitationQueryKeys.list('sent') });
    if (createdInvitation?.groupId) {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.detail(createdInvitation.groupId) });
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
    if (expelledUser?.groupId) {
      queryClient.invalidateQueries({ queryKey: groupQueryKeys.detail(expelledUser.groupId) });
    }
  },
};
