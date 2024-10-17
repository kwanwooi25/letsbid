import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { AuctionCaseLike } from '@/types/auctionCase';
import { useRouter } from 'next/navigation';

export default function PlaceBidButton({ auctionCase }: Props) {
  const router = useRouter();

  const handleClickPlaceBid = () => {
    router.push(
      `${PATHS.GROUP}/${auctionCase.groupId}${PATHS.AUCTION_CASE}/${auctionCase.id}${PATHS.BID}`,
      { scroll: false },
    );
  };

  return (
    <Button className="my-4 mx-auto" size="lg" onClick={handleClickPlaceBid}>
      입찰하기
    </Button>
  );
}

type Props = {
  auctionCase: AuctionCaseLike;
};
