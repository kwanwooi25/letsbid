import { API_ROUTE } from '@/const/paths';
import { SuccessResponse } from '@/types/api';
import { InvitationWithGroupAndInviter } from '@/types/invitation';
import { MutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { getApiUrl, getQueryClient } from '../config';
import { invitationQueryKeys } from './queryKey';

export const respondToInvitationMutationOptions: MutationOptions<
  InvitationWithGroupAndInviter,
  Error,
  { invitationId: string; response: 'accept' | 'reject' }
> = {
  mutationFn: async ({ invitationId, response }) => {
    try {
      const url = getApiUrl(`${API_ROUTE.INVITATION}/${invitationId}/${response}`);
      const res = await axios<SuccessResponse<InvitationWithGroupAndInviter>>({
        method: 'get',
        url,
      });
      return res.data.data;
    } catch (e) {
      throw e;
    }
  },
  onSettled: () => {
    const queryClient = getQueryClient();
    queryClient.invalidateQueries({ queryKey: invitationQueryKeys.list('received') });
  },
};