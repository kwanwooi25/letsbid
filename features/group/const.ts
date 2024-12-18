import { UserRole } from '@prisma/client';
import { GroupListQueryOptions, GroupMemberListQueryOptions } from './types';

export const DEFAULT_GROUP_LIST_QUERY_OPTIONS = {
  page: 1,
  per: 10,
  search: '',
} satisfies GroupListQueryOptions;

export const DEFAULT_GROUP_MEMBER_LIST_QUERY_OPTIONS = {
  page: 1,
  per: 10,
  search: '',
} satisfies GroupMemberListQueryOptions;

export const GROUP_MEMBER_ROLE: Record<UserRole, UserRole[]> = {
  [UserRole.USER]: [UserRole.USER, UserRole.PAID_USER, UserRole.VIP_USER, UserRole.ADMIN],
  [UserRole.PAID_USER]: [UserRole.PAID_USER, UserRole.VIP_USER, UserRole.ADMIN],
  [UserRole.VIP_USER]: [UserRole.VIP_USER, UserRole.ADMIN],
  [UserRole.ADMIN]: [UserRole.ADMIN],
};

export const USER_ROLE_TRANSLATION: Record<UserRole, string> = {
  [UserRole.USER]: '일반 회원',
  [UserRole.PAID_USER]: '유료 회원',
  [UserRole.VIP_USER]: 'VIP 회원',
  [UserRole.ADMIN]: '관리자',
};
