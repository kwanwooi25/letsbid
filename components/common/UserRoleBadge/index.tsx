import { cn } from '@/lib/utils';
import { UserRole } from '@prisma/client';
import { LucideCog, LucideStar } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function UserRoleBadge({ className, role, ...props }: Props) {
  return (
    <div
      className={cn(
        'w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0',
        role === 'USER' && 'gradient-bronze',
        role === 'PAID_USER' && 'gradient-silver',
        role === 'VIP_USER' && 'gradient-gold',
        role === 'ADMIN' && 'gradient-emerald',
        className,
      )}
      {...props}
    >
      {role === 'ADMIN' ? (
        <LucideCog className="w-[80%] h-[80%] text-green-950" strokeWidth={2} />
      ) : (
        <LucideStar
          className={cn(
            'w-[70%] h-[70%]',
            role === 'USER' && 'text-yellow-950',
            role === 'PAID_USER' && 'text-gray-950',
            role === 'VIP_USER' && 'text-yellow-950',
          )}
          strokeWidth={2}
        />
      )}
    </div>
  );
}

type Props = HTMLAttributes<HTMLDivElement> & {
  role: UserRole;
};
