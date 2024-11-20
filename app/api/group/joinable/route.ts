import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { DEFAULT_GROUP_LIST_QUERY_OPTIONS } from '@/features/group/const';
import { GroupListQueryOptions } from '@/features/group/types';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import { PaginationMeta } from '../../types';
import { DEFAULT_GROUP_INCLUDE } from '../const';

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromSession();
    const userId = user!.id!;
    const {
      page = DEFAULT_GROUP_LIST_QUERY_OPTIONS.page,
      per = DEFAULT_GROUP_LIST_QUERY_OPTIONS.per,
      search = DEFAULT_GROUP_LIST_QUERY_OPTIONS.search,
    }: GroupListQueryOptions = await req.json();

    const where: Prisma.GroupWhereInput = {
      members: {
        none: {
          userId,
        },
      },
      archivedAt: null,
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
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
}
