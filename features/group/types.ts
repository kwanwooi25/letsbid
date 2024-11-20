import { Group, User, UsersOnGroups } from '@prisma/client';

export type GroupWithMembers = Group & { members: UsersOnGroups[] };

export type GroupMember = UsersOnGroups & { user: User };

export type GroupListQueryOptions = {
  page?: number;
  per?: number;
  search?: string;
};

export type GroupMemberListQueryOptions = {
  page?: number;
  per?: number;
  search?: string;
};
