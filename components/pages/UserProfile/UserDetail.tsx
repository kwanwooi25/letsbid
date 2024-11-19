'use client';

import { Skeleton } from '@/components/ui/skeleton';
import UserImage from '@/components/common/UserImage';
import { formatPhoneNumber } from '@/lib/string';
import { useSession } from 'next-auth/react';

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

function UserDetailSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <UserImage className="self-start" />

      <div className="flex flex-col gap-2">
        <Skeleton className="h-[28px] w-[80px]" />
        <Skeleton className="h-[20px] w-[180px]" />
        <Skeleton className="h-[20px] w-[100px]" />
      </div>
    </div>
  );
}

UserDetail.Skeleton = UserDetailSkeleton;
