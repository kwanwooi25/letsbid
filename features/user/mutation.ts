import { SignInFormSchema } from '@/components/pages/SignInForm/formSchema';
import { SignUpFormSchema } from '@/components/pages/SignUpForm/formSchema';
import { UserFormSchema } from '@/components/pages/UserForm/formSchema';
import { API_ROUTE } from '@/const/paths';
import { getApiUrl } from '@/lib/query';
import { SuccessResponse } from '@/app/api/types';
import { User } from '@prisma/client';
import { MutationOptions } from '@tanstack/react-query';
import axios from 'axios';

export const createUserMutationOptions: MutationOptions<User, Error, SignUpFormSchema> = {
  mutationFn: async (data: SignUpFormSchema) => {
    try {
      const url = getApiUrl(API_ROUTE.USER);
      const res = await axios<SuccessResponse<User>>({
        method: 'post',
        url,
        data,
      });
      return res.data.data;
    } catch (e) {
      throw e;
    }
  },
};

export const updateUserMutationOptions: MutationOptions<User, Error, UserFormSchema> = {
  mutationFn: async (data) => {
    try {
      const url = getApiUrl(`${API_ROUTE.USER}/${data.id}`);
      const res = await axios<SuccessResponse<User>>({
        method: 'patch',
        url,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data.data;
    } catch (e) {
      throw e;
    }
  },
};

export const loginUserMutationOptions: MutationOptions<User, Error, SignInFormSchema> = {
  mutationFn: async (data: SignInFormSchema) => {
    try {
      const url = getApiUrl(API_ROUTE.USER_LOGIN);
      const res = await axios<SuccessResponse<User>>({
        method: 'post',
        url,
        data,
      });
      return res.data.data;
    } catch (e) {
      throw e;
    }
  },
};
