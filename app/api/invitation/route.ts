import { InvitationFormSchema } from '@/context/FormDialog/InvitationForm/formSchema';
import { getUserFromSession, handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromSession();
    const userId = user!.id!;
    const data: InvitationFormSchema = await req.json();
    const [userToInvite, invitation, group] = await Promise.all([
      await prisma.user.findUnique({ where: { email: data.inviteeEmail } }),
      await prisma.invitation.findFirst({
        where: { groupId: data.groupId, inviteeEmail: data.inviteeEmail, status: 'PENDING' },
      }),
      await prisma.group.findUnique({ where: { id: data.groupId }, include: { members: true } }),
    ]);

    if (!userToInvite) {
      return handleFail({
        status: HttpStatusCode.NotFound,
        message: '존재하지 않는 사용자입니다',
      });
    }

    if (invitation) {
      return handleFail({
        status: HttpStatusCode.BadRequest,
        message: '이미 초대를 발송한 사용자입니다',
      });
    }

    if (group?.members.map((member) => member.userId).includes(userToInvite.id)) {
      return handleFail({
        status: HttpStatusCode.BadRequest,
        message: '이미 그룹에 속한 사용자입니다',
      });
    }

    const createdInvitation = await prisma.invitation.create({
      data: {
        inviteeEmail: data.inviteeEmail,
        groupId: data.groupId,
        inviterId: userId,
      },
    });
    return handleSuccess({ data: createdInvitation, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
