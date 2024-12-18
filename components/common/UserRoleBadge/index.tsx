import { USER_ROLE_TRANSLATION } from '@/features/group/const';
import { cn } from '@/lib/utils';
import { UserRole } from '@prisma/client';
import { LucideCog, LucideStar } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function UserRoleBadge({ className, role, withRoleName, ...props }: Props) {
  return (
    <div
      className={cn(
        'w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0',
        role === 'USER' && 'gradient-bronze text-yellow-950',
        role === 'PAID_USER' && 'gradient-silver text-gray-950',
        role === 'VIP_USER' && 'gradient-gold text-yellow-950',
        role === 'ADMIN' && 'gradient-emerald text-green-950',
        withRoleName && 'w-auto pl-1 pr-2',
        className,
      )}
      {...props}
    >
      {role === 'ADMIN' ? (
        <LucideCog className="w-[75%] h-[75%]" strokeWidth={2} />
      ) : (
        <LucideStar className="w-[70%] h-[70%]" strokeWidth={2} />
      )}

      {withRoleName && (
        <span className="text-xs font-semibold shrink-0 ml-1">{USER_ROLE_TRANSLATION[role]}</span>
      )}
    </div>
  );
}

type Props = HTMLAttributes<HTMLDivElement> & {
  role: UserRole;
  withRoleName?: boolean;
};
