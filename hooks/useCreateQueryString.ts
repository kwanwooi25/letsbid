import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useCreateQueryString() {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (keyValuePairs: Record<string, unknown>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(keyValuePairs).forEach(([key, value]) => {
        params.set(key, String(value));
      });
      return params.toString();
    },
    [searchParams],
  );

  return createQueryString;
}
