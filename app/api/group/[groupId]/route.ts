import { handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { GroupFormSchema } from '@/components/pages/GroupForm/formSchema';
import { auth } from '@/features/auth';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '../../user/utils';
import { DEFAULT_GROUP_INCLUDE } from '../const';

export const GET = auth(async function GET(req, { params }) {
  try {
    const groupId = String(params?.groupId);

    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: DEFAULT_GROUP_INCLUDE,
    });
    return handleSuccess({ data: group });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});

export const PATCH = auth(async function PATCH(req, { params }) {
  try {
    const groupId = String(params?.groupId);
    const data = (await req.json()) as GroupFormSchema;
    const { password, ...passwordExcludedGroup } = data;

    const updatedGroup = await prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        ...passwordExcludedGroup,
        ...(passwordExcludedGroup.isPrivate && !!password
          ? { password: hashPassword(password) }
          : {}),
        ...(!passwordExcludedGroup.isPrivate ? { password: null } : {}),
      },
      include: DEFAULT_GROUP_INCLUDE,
    });
    return handleSuccess({ data: updatedGroup });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});

export const DELETE = auth(async function DELETE(req, { params }) {
  try {
    const groupId = String(params?.groupId);
    await prisma.group.delete({
      where: {
        id: groupId,
      },
    });
    return handleSuccess({ data: { id: groupId } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});
