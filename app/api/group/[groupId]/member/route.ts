import { PaginationMeta } from '@/app/api/types';
import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { DEFAULT_GROUP_MEMBER_LIST_QUERY_OPTIONS } from '@/features/group/const';
import { GroupMemberListQueryOptions } from '@/features/group/types';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    const groupId = params.groupId;
    await getUserFromSession();
    const {
      page = DEFAULT_GROUP_MEMBER_LIST_QUERY_OPTIONS.page,
      per = DEFAULT_GROUP_MEMBER_LIST_QUERY_OPTIONS.per,
      search = DEFAULT_GROUP_MEMBER_LIST_QUERY_OPTIONS.search,
    }: GroupMemberListQueryOptions = await req.json();

    const where: Prisma.UsersOnGroupsWhereInput = {
      groupId,
      OR: [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
      ],
    };

    const [totalCount, groupMembers] = await prisma.$transaction([
      prisma.usersOnGroups.count({ where }),
      prisma.usersOnGroups.findMany({
        where,
        include: {
          user: true,
        },
        orderBy: [{ joinedAt: 'asc' }],
        take: per,
        skip: per * (page - 1),
      }),
    ]);

    const totalPages = Math.ceil(totalCount / per);
    const meta: PaginationMeta = {
      page,
      per,
      totalCount,
      totalPages,
      hasMore: totalPages < page,
    };

    return handleSuccess({
      data: groupMembers,
      meta,
    });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
