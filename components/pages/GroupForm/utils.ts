import { GROUP_MEMBER_ROLE } from '@/features/group/const';
import { GroupWithMembers } from '@/features/group/types';
import { Group } from '@prisma/client';
import { GroupFormSchema } from './formSchema';

export function getDefaultFormValues(group?: Group | GroupWithMembers): GroupFormSchema {
  if (!group) {
    return {
      name: '',
      description: '',
      isPrivate: false,
      password: '',
      maxMembers: 1000,
      userRoles: GROUP_MEMBER_ROLE.USER,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, hostId, ...rest } = group;

  return rest;
}
