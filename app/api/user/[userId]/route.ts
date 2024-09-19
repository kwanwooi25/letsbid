import { handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const data = await req.json();
    const updatedUser = await prisma.user.update({
      where: { id: params.userId },
      data,
    });
    return handleSuccess({ data: updatedUser });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
