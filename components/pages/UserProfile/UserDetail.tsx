'use client';

import UserImage from '@/components/UserImage';
import { formatPhoneNumber } from '@/lib/string';
import { useSession } from 'next-auth/react';
import UserDetailSkeleton from './UserDetailSkeleton';

export default function UserDetail() {
  const session = useSession();

  if (!session?.data?.user) return null;

  const { user } = session.data;

  return (
    <div className="flex items-center gap-4">
      <UserImage className="self-start" src={user.image} alt={user.name} />

      <div className="flex flex-col gap-2">
        <span className="text-xl font-bold">{user.name}</span>
        <span className="text-sm font-semibold text-primary/50">{user.email}</span>
        {user.mobile && (
          <span className="text-sm font-semibold text-primary/50">
            {formatPhoneNumber(user.mobile)}
          </span>
        )}
      </div>
    </div>
  );
}

UserDetail.Skeleton = UserDetailSkeleton;
