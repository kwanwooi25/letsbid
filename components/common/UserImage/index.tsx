import { cn } from '@/lib/utils';
import { UserRole } from '@prisma/client';
import { LucideUser2 } from 'lucide-react';
import Image from 'next/image';
import { HTMLAttributes } from 'react';
import HostBadge from '../HostBadge';
import UserRoleBadge from '../UserRoleBadge';

export default function UserImage({
  containerClassName,
  className,
  src,
  alt = 'user image',
  size = 64,
  badgeSize = size / 1.8,
  isHost,
  isViceHost,
  role,
}: Props) {
  return (
    <div className={cn('relative', containerClassName)}>
      {!!src ? (
        <Image
          className={cn('rounded-full object-cover', className)}
          style={{
            minWidth: `${size}px`,
            minHeight: `${size}px`,
            maxWidth: `${size}px`,
            maxHeight: `${size}px`,
          }}
          src={src}
          alt={alt}
          width={size}
          height={size}
        />
      ) : (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-primary-foreground',
            className,
          )}
          style={{ minWidth: size, minHeight: size, width: size, height: size }}
        >
          <LucideUser2 className="w-[60%] h-[60%]" />
        </div>
      )}

      {(isHost || isViceHost) && (
        <HostBadge
          className="absolute top-0 left-0 translate-x-[-40%] translate-y-[-40%] border-2 border-background"
          style={{ width: badgeSize, height: badgeSize }}
          isViceHost={isViceHost}
        />
      )}

      {!!role && (
        <UserRoleBadge
          className="absolute bottom-0 right-0 translate-x-[40%] translate-y-[40%] border-2 border-background"
          style={{ width: badgeSize, height: badgeSize }}
          role={role}
        />
      )}
    </div>
  );
}

type Props = {
  containerClassName?: HTMLAttributes<HTMLDivElement>['className'];
  className?: HTMLAttributes<HTMLDivElement>['className'];
  src?: string | null;
  alt?: string;
  size?: number;
  badgeSize?: number;
  isHost?: boolean;
  isViceHost?: boolean;
  role?: UserRole;
};
