import { handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { auth } from '@/features/auth';
import { prisma } from '@/lib/prisma';
import { DEFAULT_ARTICLE_INCLUDE } from '../const';

export const GET = auth(async function GET(req, { params }) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: String(params?.articleId) },
      include: DEFAULT_ARTICLE_INCLUDE,
    });
    return handleSuccess({ data: article });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});

export const PATCH = auth(async function PATCH(req, { params }) {
  try {
    const data = await req.json();
    const article = await prisma.article.update({
      where: { id: String(params?.articleId) },
      data,
      include: DEFAULT_ARTICLE_INCLUDE,
    });
    return handleSuccess({ data: article });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});

export const DELETE = auth(async function DELETE(req, { params }) {
  try {
    const user = req.auth?.user;
    await prisma.article.delete({
      where: { id: String(params?.articleId), authorId: user?.id },
    });
    return handleSuccess({ data: { id: String(params?.articleId) } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});
