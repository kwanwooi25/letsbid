import { PATHS } from '@/const/paths';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { useRouter } from 'next/navigation';
import { AuctionCaseLike } from './types';

export function useAuctionCaseRouter() {
  const router = useRouter();
  const currentUrl = useCurrentUrl();

  const moveToCreateAuctionCase = (groupId?: string) => {
    if (!groupId) return;

    router.push(`${PATHS.GROUP}/${groupId}${PATHS.CREATE_AUCTION_CASE}?callbackUrl=${currentUrl}`);
  };

  const moveToEditAuctionCase = (auctionCase: AuctionCaseLike) => {
    const { id, groupId } = auctionCase;
    router.push(
      `${PATHS.GROUP}/${groupId}${PATHS.AUCTION_CASE}/${id}/edit?callbackUrl=${currentUrl}`,
    );
  };

  return {
    moveToCreateAuctionCase,
    moveToEditAuctionCase,
  };
}
