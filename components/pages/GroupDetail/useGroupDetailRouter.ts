import { PATHS } from '@/const/paths';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { useParams, useRouter } from 'next/navigation';

export function useGroupDetailRouter() {
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;
  const callbackUrl = useCallbackUrl();
  const currentUrl = useCurrentUrl();

  const moveToGroupList = () => {
    router.replace(callbackUrl ? callbackUrl : PATHS.GROUP);
  };

  const moveToEditGroup = () => {
    router.push(`${PATHS.GROUP}/${groupId}/edit?callbackUrl=${currentUrl}`);
  };

  const moveToCreateAuctionCase = () => {
    router.push(`${PATHS.GROUP}/${groupId}${PATHS.CREATE_AUCTION_CASE}?callbackUrl=${currentUrl}`);
  };

  return {
    moveToGroupList,
    moveToEditGroup,
    moveToCreateAuctionCase,
  };
}
