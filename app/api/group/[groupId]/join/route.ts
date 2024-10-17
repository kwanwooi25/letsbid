import { hashPassword } from '@/app/api/user/utils';
import { getUserFromSession, handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    const user = await getUserFromSession();
    const userId = user!.id!;
    const groupId = params.groupId;
    const data = await req.json();
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: { members: true },
      omit: { password: false },
    });

    if (!group) {
      return handleFail({
        status: HttpStatusCode.NotFound,
        message: '존재하지 않는 그룹입니다',
      });
    }

    if (group.maxMembers <= group.members.length) {
      return handleFail({
        status: HttpStatusCode.BadRequest,
        message: '더이상 참여할 수 없습니다',
      });
    }

    if (group.isPrivate && hashPassword(data.password) !== group.password) {
      return handleFail({
        status: HttpStatusCode.BadRequest,
        message: '참여코드를 확인해주세요',
      });
    }

    await prisma.usersOnGroups.create({
      data: {
        userId,
        groupId,
        invitedBy: userId,
      },
    });

    return handleSuccess({ data: groupId });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
