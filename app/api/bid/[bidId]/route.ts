import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { DEFAULT_BID_INCLUDE } from '../const';

export async function GET(req: NextRequest, { params }: { params: { bidId: string } }) {
  try {
    const user = await getUserFromSession();
    const bid = await prisma.bid.findUnique({
      where: { id: params.bidId, userId: user?.id },
      include: DEFAULT_BID_INCLUDE,
    });
    return handleSuccess({ data: bid });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { bidId: string } }) {
  try {
    await getUserFromSession();
    const data = await req.json();
    const bid = await prisma.bid.update({
      where: { id: params.bidId },
      data,
      include: DEFAULT_BID_INCLUDE,
    });
    return handleSuccess({ data: bid });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { bidId: string } }) {
  try {
    const user = await getUserFromSession();
    await prisma.bid.delete({
      where: { id: params.bidId, userId: user?.id },
    });
    return handleSuccess({ data: params.bidId });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
