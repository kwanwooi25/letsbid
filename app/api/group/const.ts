import { Prisma } from '@prisma/client';

export const DEFAULT_GROUP_INCLUDE = {
  members: true,
} satisfies Prisma.GroupInclude;
