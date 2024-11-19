import { GroupListQueryOptions } from './types';

const queryKeys = {
  joined: (options: GroupListQueryOptions) => ['groups', 'joined', options],
  joinable: (options: GroupListQueryOptions) => ['groups', 'joinable', options],
  list: (type: 'archived') => ['groups', type],
  detail: (id: string) => ['group', id],
} as const;

export { queryKeys as groupQueryKeys };
