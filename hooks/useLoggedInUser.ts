'use client';

import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';

export function useLoggedInUser() {
  const session = useSession();

  const updateLoggedInUser = (user: User) => {
    session?.update({
      ...session,
      user,
    });
  };

  return {
    loggedInUser: session?.data?.user,
    isLoggedIn: !!session?.data?.user,
    isAdmin: session?.data?.user.role === 'ADMIN',
    updateLoggedInUser,
  };
}
