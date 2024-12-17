import { cn } from '@/lib/utils';
import { UserRole } from '@prisma/client';
import { LucideCog, LucideStar } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function UserRoleBadge({ className, role, ...props }: Props) {
  return (
    <div
      className={cn(
        'w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0',
        role === 'USER' && 'bg-yellow-600 dark:bg-yellow-800',
        role === 'PAID_USER' && 'bg-gray-300 dark:bg-gray-500',
        role === 'VIP_USER' && 'bg-yellow-300 dark:bg-yellow-500',
        role === 'ADMIN' && 'bg-green-400 dark:bg-green-600',
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
