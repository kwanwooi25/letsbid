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
