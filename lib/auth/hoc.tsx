/* eslint-disable @typescript-eslint/no-explicit-any */
import { PATHS } from '@/const/paths';
import { redirect } from 'next/navigation';
import { ComponentType } from 'react';
import { auth } from '../auth';

export function withAuth(Component: ComponentType<any>) {
  return async function WithAuth(props: any) {
    const session = await auth();

    if (!session?.user) return redirect(PATHS.SIGN_IN);

    return <Component {...props} />;
  };
}
