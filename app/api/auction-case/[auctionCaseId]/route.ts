import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    await getUserFromSession();
    const auctionCase = await prisma.auctionCase.findUnique({
      where: {
        id: params.auctionCaseId,
      },
    });
    return handleSuccess({ data: auctionCase });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    await getUserFromSession();
    const data = await req.json();
    const updatedAuctionCase = await prisma.auctionCase.update({
      where: { id: params.auctionCaseId },
      data,
    });
    return handleSuccess({ data: updatedAuctionCase });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
