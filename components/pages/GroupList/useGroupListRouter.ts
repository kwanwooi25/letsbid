import { PATHS } from '@/const/paths';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { useRouter } from 'next/navigation';
import { useGroupListTabs } from './useGroupListTabs';

export function useGroupListRouter() {
  const router = useRouter();
  const currentUrl = useCurrentUrl();
  const { handleTabChange } = useGroupListTabs();

  const moveToJoinableGroupList = () => handleTabChange('all');

  const moveToCreateGroup = () => router.push(`${PATHS.CREATE_GROUP}?callbackUrl=${currentUrl}`);

  return {
    moveToJoinableGroupList,
    moveToCreateGroup,
  };
}
