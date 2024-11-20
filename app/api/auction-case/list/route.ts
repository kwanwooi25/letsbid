import {
  getUserFromSession,
  handleFail,
  handlePrismaClientError,
  handleSuccess,
} from '@/app/api/utils';
import { DEFAULT_AUCTION_CASE_LIST_QUERY_OPTIONS } from '@/features/auction-case/const';
import { AuctionCaseListQueryOptions } from '@/features/auction-case/types';
import { filterBidDetails } from '@/features/auction-case/utils';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { PaginationMeta } from '../../types';
import { DEFAULT_AUCTION_CASE_INCLUDE } from '../const';

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const groupId = url.searchParams.get('groupId');
    if (!groupId) {
      return handleFail({
        status: HttpStatusCode.BadRequest,
        message: 'groupId required',
      });
    }

    const user = await getUserFromSession();
    const userId = user!.id!;
    const {
      page = DEFAULT_AUCTION_CASE_LIST_QUERY_OPTIONS.page,
      per = DEFAULT_AUCTION_CASE_LIST_QUERY_OPTIONS.per,
      search = DEFAULT_AUCTION_CASE_LIST_QUERY_OPTIONS.search,
    }: AuctionCaseListQueryOptions = await req.json();

    const where: Prisma.AuctionCaseWhereInput = {
      groupId,
      OR: [
        { caseName: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { addressDetail: { contains: search, mode: 'insensitive' } },
      ],
    };

    const [totalCount, auctionCases] = await prisma.$transaction([
      prisma.auctionCase.count({ where }),
      prisma.auctionCase.findMany({
        where,
        include: DEFAULT_AUCTION_CASE_INCLUDE,
        orderBy: [{ bidEndsAt: 'desc' }, { bidStartsAt: 'desc' }],
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

    const bidFilteredAuctionCases = auctionCases.map((auctionCase) =>
      filterBidDetails(auctionCase, userId),
    );

    return handleSuccess({
      data: bidFilteredAuctionCases,
      meta,
    });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
