import { UserRole } from '@prisma/client';
import { GROUP_MEMBER_ROLE } from './const';

export function getMinimumUserRole(userRoles: UserRole[]): UserRole {
  const option = Object.entries(GROUP_MEMBER_ROLE).find(([, value]) => {
    if (value.every((role) => userRoles.includes(role))) {
      return true;
    }
    return false;
  });
  return option?.[0] as UserRole;
}
