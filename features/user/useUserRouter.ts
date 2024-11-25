import { PATHS } from '@/const/paths';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { useRouter } from 'next/navigation';

export function useUserRouter() {
  const router = useRouter();
  const currentUrl = useCurrentUrl();

  const moveToEditUserProfile = () => {
    router.push(`${PATHS.EDIT_USER_PROFILE}?callbackUrl=${currentUrl}`);
  };

  return {
    moveToEditUserProfile,
  };
}
