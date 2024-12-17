'use client';

import UserImage from '@/components/common/UserImage';
import { Skeleton } from '@/components/ui/skeleton';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { formatPhoneNumber } from '@/lib/string';

export default function UserDetail() {
  const { loggedInUser } = useLoggedInUser();

  if (!loggedInUser) return null;

  const { name, image, email, mobile, role } = loggedInUser;

  return (
    <div className="flex items-center gap-4">
      <UserImage className="self-start" src={image} alt={name} role={role} />

      <div className="flex flex-col gap-2">
        <span className="text-xl font-bold">{name}</span>
        <span className="text-sm font-semibold text-primary/50">{email}</span>
        {mobile && (
          <span className="text-sm font-semibold text-primary/50">{formatPhoneNumber(mobile)}</span>
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
