/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from 'react';
import { protectFromUnauthorized } from './protectFromUnauthorized';
import { protectFromNonGroupMember } from './protectFromNonGroupMember';
import { auth } from '..';

export function withAuth(Component: ComponentType<any>) {
  return async function WithAuth(props: any) {
    const session = await auth();

    await protectFromUnauthorized({ session });
    await protectFromNonGroupMember({ session });

    return <Component {...props} />;
  };
}
