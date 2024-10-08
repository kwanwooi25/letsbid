import { getUserFromSession, handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { filterBidDetails } from '@/lib/auctionCase';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    const user = await getUserFromSession();
    const auctionCase = await prisma.auctionCase.findUnique({
      where: { id: params.auctionCaseId },
      include: {
        bids: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!auctionCase) {
      return handleFail({
        status: HttpStatusCode.NotFound,
        message: 'Not found',
      });
    }
    return handleSuccess({ data: filterBidDetails(auctionCase, user?.id) });
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

export async function DELETE(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    await getUserFromSession();
    await prisma.auctionCase.delete({
      where: { id: params.auctionCaseId },
    });
    return handleSuccess({ data: { id: params.auctionCaseId } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
