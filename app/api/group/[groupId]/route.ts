import { GroupFormSchema } from '@/components/pages/GroupForm/formSchema';
import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { hashPassword } from '../../user/utils';
import { DEFAULT_GROUP_INCLUDE } from '../const';

export async function GET(req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    await getUserFromSession();
    const group = await prisma.group.findUnique({
      where: {
        id: params.groupId,
      },
      include: DEFAULT_GROUP_INCLUDE,
    });
    return handleSuccess({ data: group });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    await getUserFromSession();
    const data = (await req.json()) as GroupFormSchema;
    const { password, ...passwordExcludedGroup } = data;

    const updatedGroup = await prisma.group.update({
      where: {
        id: params.groupId,
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
}

export async function DELETE(req: NextRequest, { params }: { params: { groupId: string } }) {
  try {
    await getUserFromSession();
    await prisma.group.delete({
      where: {
        id: params.groupId,
      },
    });
    return handleSuccess({ data: { id: params.groupId } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
