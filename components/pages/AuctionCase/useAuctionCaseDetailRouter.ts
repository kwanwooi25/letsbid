import { PATHS } from '@/const/paths';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { AuctionCaseLike } from '@/types/auctionCase';
import { useRouter } from 'next/navigation';

export function useAuctionCaseDetailRouter({ auctionCase }: Args) {
  const router = useRouter();
  const currentUrl = useCurrentUrl();

  const moveToGroupDetail = () => {
    if (!auctionCase) return;

    const { groupId } = auctionCase;

    router.replace(`${PATHS.GROUP}/${groupId}?tab=auctionCases`);
  };

  const moveToEditAuctionCase = () => {
    if (!auctionCase) return;

    const { id, groupId } = auctionCase;

    router.push(
      `${PATHS.GROUP}/${groupId}${PATHS.AUCTION_CASE}/${id}/edit?callbackUrl=${currentUrl}`,
    );
  };

  const moveToPlaceBid = () => {
    if (!auctionCase) return;

    router.push(
      `${PATHS.GROUP}/${auctionCase.groupId}${PATHS.AUCTION_CASE}/${auctionCase.id}${PATHS.BID}?callbackUrl=${currentUrl}`,
    );
  };

  const moveToEditBid = (bidId: string) => {
    if (!auctionCase) return;
    router.push(
      `${PATHS.GROUP}/${auctionCase.groupId}${PATHS.AUCTION_CASE}/${auctionCase.id}${PATHS.BID}/${bidId}/edit?callbackUrl=${currentUrl}`,
    );
  };

  return {
    moveToGroupDetail,
    moveToEditAuctionCase,
    moveToPlaceBid,
    moveToEditBid,
  };
}

type Args = {
  auctionCase?: AuctionCaseLike | null;
};