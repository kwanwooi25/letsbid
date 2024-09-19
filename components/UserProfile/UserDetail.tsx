'use client';

import { LucideUser2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function UserDetail() {
  const session = useSession();

  if (!session?.data?.user) return null;

  const { user } = session.data;

  return (
    <div>
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {!!user.image ? (
          <img
            className="rounded-full"
            src={user.image}
            alt={`${user.name}`}
            width={64}
            height={64}
          />
        ) : (
          <div className="w-[64px] h-[64px] flex items-center justify-center rounded-full bg-primary-foreground">
            <LucideUser2 className="w-[60%] h-[60%]" />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">{user.name}</span>
          <span className="text-sm font-semibold text-primary/50">{user.email}</span>
        </div>
      </div>
    </div>
  );
}
