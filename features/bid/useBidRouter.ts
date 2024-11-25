import { PATHS } from '@/const/paths';
import { AuctionCaseLike } from '@/features/auction-case/types';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { AuctionCase } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { BidWithUserAndAuctionCase } from './types';

export function useBidRouter() {
  const router = useRouter();
  const currentUrl = useCurrentUrl();

  const moveToPlaceBid = (auctionCase?: AuctionCaseLike | AuctionCase | null) => {
    if (!auctionCase) return;

    router.push(
      `${PATHS.GROUP}/${auctionCase.groupId}${PATHS.AUCTION_CASE}/${auctionCase.id}${PATHS.BID}?callbackUrl=${currentUrl}`,
    );
  };

  const moveToEditBid = (bid: BidWithUserAndAuctionCase) => {
    const { id, auctionCase } = bid;

    router.push(
      `${PATHS.GROUP}/${auctionCase.groupId}${PATHS.AUCTION_CASE}/${auctionCase.id}${PATHS.BID}/${id}/edit?callbackUrl=${currentUrl}`,
    );
  };

  return {
    moveToPlaceBid,
    moveToEditBid,
  };
}
