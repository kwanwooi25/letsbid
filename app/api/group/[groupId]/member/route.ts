import { PaginationMeta } from '@/app/api/types';
import { handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { auth } from '@/features/auth';
import { DEFAULT_GROUP_MEMBER_LIST_QUERY_OPTIONS } from '@/features/group/const';
import { GroupMemberListQueryOptions } from '@/features/group/types';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const POST = auth(async function POST(req, { params }) {
  try {
    const groupId = String(params?.groupId);
    const {
      page = DEFAULT_GROUP_MEMBER_LIST_QUERY_OPTIONS.page,
      per = DEFAULT_GROUP_MEMBER_LIST_QUERY_OPTIONS.per,
      search = DEFAULT_GROUP_MEMBER_LIST_QUERY_OPTIONS.search,
    }: GroupMemberListQueryOptions = await req.json();
    const searchSplit = search.trim().split(' ');

    const where: Prisma.UsersOnGroupsWhereInput = {
      groupId,
      OR: [
        ...searchSplit.map(
          (word): Prisma.UsersOnGroupsWhereInput => ({
            user: { name: { contains: word.trim(), mode: 'insensitive' } },
          }),
        ),
        ...searchSplit.map(
          (word): Prisma.UsersOnGroupsWhereInput => ({
            user: { email: { contains: word.trim(), mode: 'insensitive' } },
          }),
        ),
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
});
