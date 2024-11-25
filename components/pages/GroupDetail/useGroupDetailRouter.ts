import { PATHS } from '@/const/paths';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { useParams, useRouter } from 'next/navigation';

export function useGroupDetailRouter() {
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;
  const currentUrl = useCurrentUrl();

  const moveToCreateAuctionCase = () => {
    router.push(`${PATHS.GROUP}/${groupId}${PATHS.CREATE_AUCTION_CASE}?callbackUrl=${currentUrl}`);
  };

  return {
    moveToCreateAuctionCase,
  };
}
