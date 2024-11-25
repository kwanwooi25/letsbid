import { PATHS } from '@/const/paths';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { useRouter } from 'next/navigation';

export function useGroupDetailMenuRouter() {
  const router = useRouter();
  const callbackUrl = useCallbackUrl();
  const currentUrl = useCurrentUrl();

  const moveToGroupList = () => {
    router.replace(callbackUrl ? callbackUrl : PATHS.GROUP);
  };

  const moveToEditGroup = (groupId: string) => {
    router.push(`${PATHS.GROUP}/${groupId}/edit?callbackUrl=${currentUrl}`);
  };

  const moveToCreateAuctionCase = (groupId: string) => {
    router.push(`${PATHS.GROUP}/${groupId}${PATHS.CREATE_AUCTION_CASE}?callbackUrl=${currentUrl}`);
  };

  return {
    moveToGroupList,
    moveToEditGroup,
    moveToCreateAuctionCase,
  };
}
