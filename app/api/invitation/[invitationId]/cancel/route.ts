import { getUserFromSession, handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { invitationId: string } }) {
  try {
    const user = await getUserFromSession();
    const userId = user!.id!;
    const invitation = await prisma.invitation.findUnique({
      where: {
        id: params.invitationId,
        inviterId: userId,
        status: 'PENDING',
      },
    });
    if (!invitation) {
      return handleFail({
        status: HttpStatusCode.NotFound,
        message: '유효하지 않은 초대입니다',
      });
    }

    await prisma.invitation.delete({
      where: { id: params.invitationId },
    });

    return handleSuccess({ data: null });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
