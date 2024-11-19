import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { DEFAULT_GROUP_LIST_QUERY_OPTIONS } from '@/features/group/const';
import { GroupListQueryOptions } from '@/features/group/types';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';
import { PaginationMeta } from '../../types';

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
        some: {
          userId,
        },
      },
      archivedAt: {
        not: null,
      },
      OR: [{ name: { contains: search } }, { description: { contains: search } }],
    };

    const totalCount = await prisma.group.count({ where });
    const totalPages = Math.ceil(totalCount / per);
    const groups = await prisma.group.findMany({
      where,
      include: {
        members: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: per,
      skip: per * (page - 1),
    });

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
