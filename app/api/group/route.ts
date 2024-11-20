import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { GroupFormSchema } from '@/components/pages/GroupForm/formSchema';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';
import { hashPassword } from '../user/utils';

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromSession();
    const userId = user!.id!;
    const data = (await req.json()) as GroupFormSchema;
    const createdGroup = await prisma.group.create({
      data: {
        ...data,
        password: hashPassword(data.password),
        hostId: userId,
        members: {
          create: {
            userId: userId,
            invitedBy: userId,
          },
        },
      },
      include: {
        members: true,
      },
    });
    return handleSuccess({ data: createdGroup, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
