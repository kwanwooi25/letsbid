import { handleFail, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { GroupFormSchema } from '@/components/pages/GroupForm/formSchema';
import { auth } from '@/features/auth';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';
import { hashPassword } from '../user/utils';
import { DEFAULT_GROUP_INCLUDE } from './const';

export const POST = auth(async function POST(req) {
  try {
    const user = req.auth?.user;
    if (!user || user?.role !== 'ADMIN') {
      return handleFail({ status: HttpStatusCode.Unauthorized });
    }

    const { id } = user;
    const data = (await req.json()) as GroupFormSchema;
    const createdGroup = await prisma.group.create({
      data: {
        ...data,
        password: hashPassword(data.password),
        hostId: id,
        members: {
          create: {
            userId: id,
            invitedBy: id,
          },
        },
      },
      include: DEFAULT_GROUP_INCLUDE,
    });
    return handleSuccess({ data: createdGroup, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});
