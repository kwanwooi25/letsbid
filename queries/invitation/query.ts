import { API_ROUTE } from '@/const/paths';
import { SuccessResponse } from '@/types/api';
import { InvitationWithGroupAndInviter } from '@/types/invitation';
import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { getApiUrl } from '../config';
import { invitationQueryKeys } from './queryKey';

export const getInvitationListQueryOptions = (type: 'received' | 'sent') =>
  queryOptions({
    queryKey: invitationQueryKeys.list(type),
    queryFn: async () => {
      const url = getApiUrl(`${API_ROUTE.INVITATION}/${type}`);
      const res = await axios<SuccessResponse<InvitationWithGroupAndInviter[]>>({
        method: 'get',
        url,
      });
      return res.data.data;
    },
  });
