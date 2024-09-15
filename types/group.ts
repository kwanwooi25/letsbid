import { Group, User, UsersOnGroups } from '@prisma/client';

export type GroupWithMembers = Group & { members: UsersOnGroups[] };
export type GroupWithMembersAsUsers = Group & { members: (UsersOnGroups & { user: User })[] };
