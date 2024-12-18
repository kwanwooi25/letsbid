import { PATHS } from '@/const/paths';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { useRouter } from 'next/navigation';

export function useGroupRouter() {
  const router = useRouter();
  const callbackUrl = useCallbackUrl();
  const currentUrl = useCurrentUrl();

  const moveToGroupList = () => {
    router.replace(callbackUrl ? callbackUrl : PATHS.GROUP);
  };

  const moveToCreateGroup = () => router.push(`${PATHS.CREATE_GROUP}?callbackUrl=${currentUrl}`);

  const moveToEditGroup = (groupId: string) => {
    router.push(`${PATHS.GROUP}/${groupId}/edit?callbackUrl=${currentUrl}`);
  };

  const moveToGroupDetail = (groupId?: string) => {
    if (!groupId) return;

    router.replace(`${PATHS.GROUP}/${groupId}?tab=auctionCases`);
  };

  return {
    moveToGroupList,
    moveToCreateGroup,
    moveToEditGroup,
    moveToGroupDetail,
  };
}
