'use client';

import { useSearchParams } from 'next/navigation';

export function useCallbackUrl() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return callbackUrl;
}
