import { getUserFromSession, handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { invitationId: string } }) {
  try {
    const user = await getUserFromSession();
    const userId = user!.id!;
    const userEmail = user!.email!;
    const invitation = await prisma.invitation.findUnique({
      where: {
        id: params.invitationId,
        inviteeEmail: userEmail,
        status: 'PENDING',
      },
    });
    if (!invitation) {
      return handleFail({
        status: HttpStatusCode.NotFound,
        message: '유효하지 않은 초대입니다',
      });
    }

    const [updatedInvitation] = await Promise.all([
      await prisma.invitation.update({
        where: { id: params.invitationId },
        data: { status: 'ACCEPTED' },
        include: {
          group: true,
          inviter: true,
        },
      }),
      await prisma.usersOnGroups.create({
        data: {
          userId,
          groupId: invitation.groupId,
          invitedBy: invitation.inviterId,
        },
      }),
    ]);

    return handleSuccess({ data: updatedInvitation });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
