import { GroupListQueryOptions, GroupMemberListQueryOptions } from './types';

const queryKeys = {
  joined: (options: GroupListQueryOptions) => ['groups', 'joined', options],
  joinable: (options: GroupListQueryOptions) => ['groups', 'joinable', options],
  archived: (options: GroupListQueryOptions) => ['groups', 'archived', options],
  detail: (id: string) => ['group', id],
  memberList: (groupId: string, options?: GroupMemberListQueryOptions) => {
    if (options) {
      return ['groupMembers', groupId, options];
    }

    return ['groupMembers', groupId];
  },
} as const;

export { queryKeys as groupQueryKeys };
