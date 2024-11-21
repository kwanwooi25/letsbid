import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';
import { DEFAULT_ARTICLE_INCLUDE } from '../const';

export async function GET(req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    await getUserFromSession();
    const article = await prisma.article.findUnique({
      where: { id: params.articleId },
      include: DEFAULT_ARTICLE_INCLUDE,
    });
    return handleSuccess({ data: article });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    await getUserFromSession();
    const data = await req.json();
    const article = await prisma.article.update({
      where: { id: params.articleId },
      data,
      include: DEFAULT_ARTICLE_INCLUDE,
    });
    return handleSuccess({ data: article });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    const user = await getUserFromSession();
    await prisma.article.delete({
      where: { id: params.articleId, authorId: user?.id },
    });
    return handleSuccess({ data: { id: params.articleId } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
