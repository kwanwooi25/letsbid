import { PATHS } from '@/const/paths';
import { AuctionCaseLike } from '@/features/auction-case/types';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { AuctionCase } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { ArticleWithAuctionCaseAuthor } from '../types';

export function useArticleDetailMenuRouter() {
  const router = useRouter();
  const currentUrl = useCurrentUrl();

  const moveToArticleList = (auctionCase: AuctionCaseLike | AuctionCase) => {
    router.push(
      `${PATHS.GROUP}/${auctionCase.groupId}${PATHS.AUCTION_CASE}/${auctionCase.id}?tab=articles`,
    );
  };

  const moveToEditArticle = (article: ArticleWithAuctionCaseAuthor) => {
    const { id, auctionCase } = article;
    router.push(
      `${PATHS.GROUP}/${auctionCase.groupId}${PATHS.AUCTION_CASE}/${auctionCase.id}${PATHS.ARTICLE}/${id}/edit?callbackUrl=${currentUrl}`,
    );
  };

  return { moveToArticleList, moveToEditArticle };
}
