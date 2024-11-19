import { GroupListQueryOptions } from './types';

export const DEFAULT_GROUP_LIST_QUERY_OPTIONS = {
  page: 1,
  per: 5,
  search: '',
} satisfies GroupListQueryOptions;
