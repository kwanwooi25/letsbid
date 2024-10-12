import { Group } from '@prisma/client';
import { GroupFormSchema } from './formSchema';
import { GroupWithMembers } from '@/types/group';

export function getDefaultFormValues(group?: Group | GroupWithMembers): GroupFormSchema {
  if (!group) {
    return {
      name: '',
    };
  }

  const { id, name } = group;

  return {
    id,
    name,
  };
}
