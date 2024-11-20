import { Prisma } from '@prisma/client';

export const DEFAULT_GROUP_INCLUDE: Prisma.GroupInclude = {
  members: true,
};
