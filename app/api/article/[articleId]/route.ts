import { getUserFromSession, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { articleId: string } }) {
  try {
    await getUserFromSession();
    const article = await prisma.article.findUnique({
      where: { id: params.articleId },
      include: { author: true, auctionCase: true, attachments: true },
    });
    return handleSuccess({ data: article });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
