/* eslint-disable @typescript-eslint/no-explicit-any */
import { PATHS } from '@/const/paths';
import { headers } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';
import { ComponentType } from 'react';
import { auth } from '../auth';

export function withAuth(Component: ComponentType<any>) {
  return async function WithAuth(props: any) {
    const session = await auth();
    const headerList = headers();
    const pathname = headerList.get('x-url-pathname');
    const search = headerList.get('x-url-search');

    let callbackUrl = '';
    if (pathname) callbackUrl += pathname;
    if (search) callbackUrl += search;

    let redirectUrl = PATHS.SIGN_IN;
    if (callbackUrl) redirectUrl += `?callbackUrl=${callbackUrl}`;

    if (!session?.user) return redirect(redirectUrl, RedirectType.push);

    return <Component {...props} />;
  };
}
