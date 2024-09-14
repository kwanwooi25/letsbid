'use client';

import { API_ROUTE } from '@/const/paths';
import { GroupFormSchema } from '@/context/FormDialog/GroupForm/formSchema';
import { SuccessResponse } from '@/types/api';
import { GroupWithMembers } from '@/types/group';
import { MutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { getQueryClient } from '../config';
import { groupQueryKeys } from './queryKey';

export const createGroupMutationOptions: MutationOptions<GroupWithMembers, Error, GroupFormSchema> =
  {
    mutationFn: async (data: GroupFormSchema) => {
      try {
        const res = await axios<SuccessResponse<GroupWithMembers>>({
          method: 'post',
          url: API_ROUTE.CREATE_GROUP,
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
        const res = await axios<SuccessResponse<GroupWithMembers>>({
          method: 'patch',
          url: API_ROUTE.UPDATE_GROUP,
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
