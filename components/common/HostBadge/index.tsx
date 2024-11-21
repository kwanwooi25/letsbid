import { cn } from '@/lib/utils';
import { LucideCrown } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function HostBadge({ className }: Props) {
  return (
    <div
      className={cn(
        'w-[24px] h-[24px] rounded-full bg-yellow-300 dark:bg-yellow-500 flex items-center justify-center shrink-0',
        className,
      )}
    >
      <LucideCrown
        className="w-[55%] h-[55%] text-yellow-700 dark:text-primary-foreground"
        strokeWidth={2}
      />
    </div>
  );
}

type Props = {
  className?: HTMLAttributes<HTMLDivElement>['className'];
};
