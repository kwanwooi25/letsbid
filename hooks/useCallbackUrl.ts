'use client';

export function useCallbackUrl() {
  const getCallbackUrl = (url: string) => {
    const [pathname, queryString] = url.split('?');
    const params = new URLSearchParams(queryString);
    params.set('timestamp', new Date().toTimeString());
    return `${pathname}?${params.toString()}`;
  };

  return getCallbackUrl;
}
