import { UserRole } from '@prisma/client';

export const USER_ROLES_SELECT_OPTIONS = [
  { label: '무료 회원', value: UserRole.USER },
  { label: '유료 회원', value: UserRole.PAID_USER },
  { label: 'VIP', value: UserRole.VIP_USER },
  { label: '관리자', value: UserRole.ADMIN },
] as const;
