import { cn } from '@/lib/utils';
import { LucideCrown } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function HostBadge({ className, isViceHost, ...props }: Props) {
  return (
    <div
      className={cn(
        'w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0',
        isViceHost ? 'gradient-silver' : 'gradient-gold',
        className,
      )}
      {...props}
    >
      <LucideCrown
        className={cn(
          'w-[60%] h-[60%] dark:text-primary-foreground',
          isViceHost ? 'text-gray-700' : 'text-yellow-700',
        )}
        strokeWidth={2}
      />
    </div>
  );
}

type Props = HTMLAttributes<HTMLDivElement> & {
  isViceHost?: boolean;
};
