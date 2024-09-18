import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    const user = await getUserFromSession();
    const data = await req.json();
    const createdAuctionCase = await prisma.bid.create({
      data: {
        ...data,
        auctionCaseId: params.auctionCaseId,
        userId: user?.id,
      },
    });
    return handleSuccess({ data: createdAuctionCase, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
