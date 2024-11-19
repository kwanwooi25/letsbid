import { GroupListQueryOptions } from './types';

const queryKeys = {
  joined: (options: GroupListQueryOptions) => ['joinedGroups', options],
  list: (type: 'all' | 'archived') => ['groups', type],
  detail: (id: string) => ['group', id],
} as const;

export { queryKeys as groupQueryKeys };
