import { GROUP_MEMBER_ROLE } from '@/features/group/const';
import { UserRole } from '@prisma/client';

export function getSelectValueByFieldValue(fieldValue: UserRole[]): UserRole {
  const option = Object.entries(GROUP_MEMBER_ROLE).find(([, value]) => {
    if (value.every((role) => fieldValue.includes(role))) {
      return true;
    }
    return false;
  });
  return option?.[0] as UserRole;
}
