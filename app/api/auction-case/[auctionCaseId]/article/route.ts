import { DEFAULT_ARTICLE_INCLUDE } from '@/app/api/article/const';
import { handleFail, handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { ArticleFormSchema } from '@/components/pages/ArticleForm/formSchema';
import { auth } from '@/features/auth';
import { prisma } from '@/lib/prisma';
import { HttpStatusCode } from 'axios';

export const POST = auth(async function POST(req, { params }) {
  try {
    const user = req.auth?.user;
    const auctionCaseId = String(params?.auctionCaseId);
    if (!user) {
      return handleFail({ status: HttpStatusCode.Unauthorized });
    }

    const data = (await req.json()) as ArticleFormSchema;
    const createdArticle = await prisma.article.create({
      data: {
        ...data,
        auctionCaseId,
        authorId: user.id,
      },
      include: DEFAULT_ARTICLE_INCLUDE,
    });
    return handleSuccess({ data: createdArticle, status: HttpStatusCode.Created });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});

export const GET = auth(async function GET(req, { params }) {
  try {
    const user = req.auth?.user;
    const auctionCaseId = String(params?.auctionCaseId);
    if (!user) {
      return handleFail({ status: HttpStatusCode.Unauthorized });
    }

    const articles = await prisma.article.findMany({
      where: {
        auctionCaseId,
        OR: [{ isPublished: true }, { isPublished: false, authorId: { equals: user.id } }],
      },
      include: DEFAULT_ARTICLE_INCLUDE,
      orderBy: [{ isPublished: 'asc' }, { updatedAt: 'desc' }],
    });
    return handleSuccess({ data: articles });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});
