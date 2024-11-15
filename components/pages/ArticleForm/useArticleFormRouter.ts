'use client';

import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { useRouter } from 'next/navigation';

export function useArticleFormRouter() {
  const router = useRouter();
  const callbackUrl = useCallbackUrl();

  const moveToPreviousPage = () => {
    if (callbackUrl) {
      return router.replace(callbackUrl);
    }

    router.back();
  };

  return {
    moveToPreviousPage,
  };
}
