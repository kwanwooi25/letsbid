import type { FailedResponse, PaginationMeta, SuccessResponse } from '@/app/api/types';
import { Prisma } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { NextResponse } from 'next/server';

export function handleFail(props?: { status?: number; message?: string }) {
  const { status = HttpStatusCode.InternalServerError, message = 'Internal Server Error' } =
    props ?? {};

  return NextResponse.json<FailedResponse>(
    {
      result: 'FAILED',
      data: null,
      meta: null,
      message,
    },
    { status },
  );
}

export function handleSuccess<D, M extends PaginationMeta>({
  data,
  meta,
  status = HttpStatusCode.Ok,
}: {
  data: D;
  meta?: M;
  status?: number;
}) {
  return NextResponse.json<SuccessResponse<D, M>>(
    {
      result: 'SUCCESS',
      data,
      meta,
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
