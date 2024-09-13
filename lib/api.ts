import { auth } from '@/lib/auth';
import type { FailedResponse, SuccessResponse } from '@/types/api';
import { Prisma } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { NextResponse } from 'next/server';

export async function getUserFromSession() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    handleFail({ status: HttpStatusCode.Unauthorized });
    return;
  }

  return user;
}

export function handleFail(props?: { status?: number; message?: string }) {
  const { status = HttpStatusCode.InternalServerError, message = 'Internal Server Error' } =
    props ?? {};

  return NextResponse.json<FailedResponse>(
    {
      result: 'FAILED',
      data: null,
      message,
    },
    { status },
  );
}

export function handleSuccess<T>({
  data,
  status = HttpStatusCode.Ok,
}: {
  data: T;
  status?: number;
}) {
  return NextResponse.json<SuccessResponse<T>>(
    {
      result: 'SUCCESS',
      data,
    },
    { status },
  );
}

export function handlePrismaClientError(e: unknown) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    return handleFail({
      status: HttpStatusCode.BadRequest,
      message: e.message,
    });
  }

  return handleFail({
    status: HttpStatusCode.BadRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    message: (e as any).message,
  });
}
