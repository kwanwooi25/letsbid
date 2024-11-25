import { PATHS } from '@/const/paths';
import { AuctionCaseLike } from '@/features/auction-case/types';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { useRouter } from 'next/navigation';

export function useAuctionCaseDetailMenuRouter() {
  const router = useRouter();
  const currentUrl = useCurrentUrl();

  const moveToGroupDetail = (auctionCase: AuctionCaseLike) => {
    const { groupId } = auctionCase;
    router.replace(`${PATHS.GROUP}/${groupId}?tab=auctionCases`);
  };

  const moveToEditAuctionCase = (auctionCase: AuctionCaseLike) => {
    const { id, groupId } = auctionCase;
    router.push(
      `${PATHS.GROUP}/${groupId}${PATHS.AUCTION_CASE}/${id}/edit?callbackUrl=${currentUrl}`,
    );
  };

  return {
    moveToGroupDetail,
    moveToEditAuctionCase,
  };
}
