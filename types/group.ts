import { Group, User } from '@prisma/client';

export type GroupWithMembers = Group & { members: User[] };
