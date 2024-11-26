import { handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { auth } from '@/features/auth';
import { DEFAULT_GROUP_LIST_QUERY_OPTIONS } from '@/features/group/const';
import { GroupListQueryOptions } from '@/features/group/types';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { PaginationMeta } from '../../types';
import { DEFAULT_GROUP_INCLUDE } from '../const';

export const POST = auth(async function POST(req) {
  try {
    const user = req.auth?.user;
    const {
      page = DEFAULT_GROUP_LIST_QUERY_OPTIONS.page,
      per = DEFAULT_GROUP_LIST_QUERY_OPTIONS.per,
      search = DEFAULT_GROUP_LIST_QUERY_OPTIONS.search,
    }: GroupListQueryOptions = await req.json();
    const searchSplit = search.trim().split(' ');

    const where: Prisma.GroupWhereInput = {
      members: {
        some: {
          userId: user?.id,
        },
      },
      archivedAt: {
        not: null,
      },
      OR: [
        ...searchSplit.map(
          (word): Prisma.GroupWhereInput => ({
            name: { contains: word.trim(), mode: 'insensitive' },
          }),
        ),
        ...searchSplit.map(
          (word): Prisma.GroupWhereInput => ({
            description: { contains: word.trim(), mode: 'insensitive' },
          }),
        ),
      ],
    };

    const [totalCount, groups] = await prisma.$transaction([
      prisma.group.count({ where }),
      prisma.group.findMany({
        where,
        include: DEFAULT_GROUP_INCLUDE,
        orderBy: {
          createdAt: 'desc',
        },
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

    return handleSuccess({ data: groups, meta });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});
