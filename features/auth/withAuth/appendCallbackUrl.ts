import { headers } from 'next/headers';

export function appendCallbackUrl(redirectPath: string) {
  const headerList = headers();
  const pathname = headerList.get('x-url-pathname');
  const search = headerList.get('x-url-search');

  let callbackUrl = '';
  if (pathname) callbackUrl += pathname;
  if (search) callbackUrl += search;

  let redirectUrl = redirectPath;
  if (callbackUrl) redirectUrl += `?callbackUrl=${callbackUrl}`;

  return redirectUrl;
}
