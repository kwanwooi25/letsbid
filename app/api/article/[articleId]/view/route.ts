import { handleFail, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { auth } from '@/features/auth';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';

export const GET = auth(async function GET(req, { params }) {
  try {
    const user = req.auth?.user;
    const articleId = String(params?.articleId);

    const [totalViewCount, viewOfMe] = await prisma.$transaction([
      prisma.viewOnArticle.count({ where: { articleId } }),
      prisma.viewOnArticle.count({ where: { userId: user?.id, articleId } }),
    ]);
    return handleSuccess({ data: { totalViewCount, isMeViewed: !!viewOfMe } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});

export const POST = auth(async function POST(req, { params }) {
  try {
    const user = req.auth?.user;
    const articleId = String(params?.articleId);
    if (!user) {
      return handleFail({ status: HttpStatusCode.Unauthorized });
    }

    const viewOnArticle = await prisma.$transaction(async (tx) => {
      const existingViewOnArticle = await tx.viewOnArticle.findFirst({
        where: {
          userId: user.id,
          articleId,
        },
      });

      if (existingViewOnArticle) {
        return existingViewOnArticle;
      }

      return await tx.viewOnArticle.create({
        data: {
          userId: user.id,
          articleId,
        },
      });
    });

    return handleSuccess({ data: viewOnArticle, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});

export const DELETE = auth(async function DELETE(req, { params }) {
  try {
    const user = req.auth?.user;
    const articleId = String(params?.articleId);

    await prisma.viewOnArticle.deleteMany({
      where: { userId: user?.id, articleId },
    });
    return handleSuccess({ data: { userId: user?.id, articleId } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});
