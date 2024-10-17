'use client';

import UserImage from '@/components/UserImage';
import { useSession } from 'next-auth/react';

export default function UserDetail() {
  const session = useSession();

  if (!session?.data?.user) return null;

  const { user } = session.data;

  return (
    <div className="flex items-center gap-4">
      <UserImage src={user.image} alt={user.name} />

      <div className="flex flex-col gap-1">
        <span className="text-xl font-bold">{user.name}</span>
        <span className="text-sm font-semibold text-primary/50">{user.email}</span>
      </div>
    </div>
  );
}
