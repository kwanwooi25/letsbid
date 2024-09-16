import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await getUserFromSession();
    const data = await req.json();
    const createdAuctionCase = await prisma.auctionCase.create({
      data,
      include: {
        group: true,
      },
    });
    return handleSuccess({ data: createdAuctionCase, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
