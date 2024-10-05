'use client';

import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import { LucideEdit, LucideUser2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import UserForm from './UserForm';

export default function UserDetail() {
  const session = useSession();
  const [isEditing, setIsEditing] = useState(false);

  if (!session?.data?.user) return null;

  const { user } = session.data;

  const handleClickEdit = () => setIsEditing(true);

  const handleSubmit = (updatedUser: User) => {
    session?.update({
      ...session,
      user: updatedUser,
    });
    setIsEditing(false);
  };

  const handleCancel = () => setIsEditing(false);

  return (
    <div>
      <div className="flex items-center gap-4">
        {!!user.image ? (
          <Image
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
          {isEditing ? (
            <UserForm user={user} onSubmit={handleSubmit} onCancel={handleCancel} />
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{user.name}</span>
              <Button variant="ghost" size="icon" onClick={handleClickEdit}>
                <LucideEdit className="w-4 h-4" />
              </Button>
            </div>
          )}
          <span className="text-sm font-semibold text-primary/50">{user.email}</span>
        </div>
      </div>
    </div>
  );
}
