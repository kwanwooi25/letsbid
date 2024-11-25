import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export default function HostBadge({ className, isViceHost, ...props }: Props) {
  return (
    <div
      className={cn(
        'w-[24px] h-[24px] rounded-full bg-yellow-300 dark:bg-yellow-500 flex items-center justify-center shrink-0',
        isViceHost && 'bg-gray-300 dark:bg-gray-500',
        className,
      )}
      {...props}
    >
      <Icon
        name="crown"
        className={cn(
          'w-[60%] h-[60%] text-yellow-700 dark:text-primary-foreground',
          isViceHost && 'text-gray-700',
        )}
        strokeWidth={2}
      />
    </div>
  );
}

type Props = HTMLAttributes<HTMLDivElement> & {
  isViceHost?: boolean;
};
