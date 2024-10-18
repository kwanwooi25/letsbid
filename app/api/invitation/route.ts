import { InvitationFormSchema } from '@/app/group/components/InvitationForm/formSchema';
import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromSession();
    const userId = user!.id!;
    const data: InvitationFormSchema = await req.json();

    const group = await prisma.group.findUnique({
      where: { id: data.groupId },
      include: { members: true },
    });

    const result = await Promise.all(
      data.inviteeEmails.map(async (email) => {
        const [userToInvite, invitation] = await Promise.all([
          await prisma.user.findUnique({ where: { email } }),
          await prisma.invitation.findFirst({
            where: { groupId: data.groupId, inviteeEmail: email, status: 'PENDING' },
          }),
        ]);

        if (!userToInvite) {
          return {
            result: 'FAIL',
            email,
            message: '존재하지 않는 사용자입니다',
          };
        }

        if (invitation) {
          return {
            result: 'FAIL',
            email,
            message: '이미 초대를 발송한 사용자입니다',
          };
        }

        if (group?.members.map((member) => member.userId).includes(userToInvite.id)) {
          return {
            result: 'FAIL',
            email,
            message: '이미 그룹에 속한 사용자입니다',
          };
        }

        await prisma.invitation.create({
          data: {
            inviteeEmail: email,
            groupId: data.groupId,
            inviterId: userId,
          },
        });

        return {
          result: 'SUCCESS',
          email,
          message: '성공적으로 초대가 발송되었습니다',
        };
      }),
    );

    return handleSuccess({ data: result, status: HttpStatusCode.Ok });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
