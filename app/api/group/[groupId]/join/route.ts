import { hashPassword } from '@/app/api/user/utils';
import { handleFail, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { auth } from '@/features/auth';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';

export const POST = auth(async function POST(req, { params }) {
  try {
    const user = req.auth?.user;
    if (!user) {
      return handleFail({ status: HttpStatusCode.Unauthorized });
    }

    const { id: userId } = user;
    const groupId = String(params?.groupId);
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
});
