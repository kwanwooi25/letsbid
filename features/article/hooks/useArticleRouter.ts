import { PATHS } from '@/const/paths';
import { AuctionCaseLike } from '@/features/auction-case/types';
import { useCurrentUrl } from '@/hooks';
import { AuctionCase } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { ArticleWithAuctionCaseAuthor } from '../types';

export function useArticleRouter() {
  const router = useRouter();
  const currentUrl = useCurrentUrl();

  const moveToArticleList = (auctionCase?: AuctionCaseLike | AuctionCase | null) => {
    if (!auctionCase) return;

    router.push(
      `${PATHS.GROUP}/${auctionCase.groupId}${PATHS.AUCTION_CASE}/${auctionCase.id}?tab=articles`,
    );
  };

  const moveToAddArticle = (auctionCase?: AuctionCaseLike | AuctionCase | null) => {
    if (!auctionCase) return;

    router.push(
      `${PATHS.GROUP}/${auctionCase.groupId}${PATHS.AUCTION_CASE}/${auctionCase.id}${PATHS.ARTICLE}?callbackUrl=${currentUrl}`,
    );
  };

  const moveToEditArticle = (article: ArticleWithAuctionCaseAuthor) => {
    const { id, auctionCase } = article;
    router.push(
      `${PATHS.GROUP}/${auctionCase.groupId}${PATHS.AUCTION_CASE}/${auctionCase.id}${PATHS.ARTICLE}/${id}/edit?callbackUrl=${currentUrl}`,
    );
  };

  const moveToArticleDetail = (article: ArticleWithAuctionCaseAuthor) => {
    const { id, auctionCase } = article;

    router.push(
      `${PATHS.GROUP}/${auctionCase.groupId}${PATHS.AUCTION_CASE}/${auctionCase.id}${PATHS.ARTICLE}/${id}?callbackUrl=${currentUrl}`,
    );
  };

  return { moveToArticleList, moveToAddArticle, moveToEditArticle, moveToArticleDetail };
}
