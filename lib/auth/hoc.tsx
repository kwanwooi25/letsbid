/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthRequired from '@/components/AuthRequired';
import { ComponentType } from 'react';
import { auth } from '../auth';

export function withAuth(Component: ComponentType<any>) {
  return async function WithAuth(props: any) {
    const session = await auth();

    if (!session?.user) return <AuthRequired />;

    return <Component {...props} />;
  };
}
