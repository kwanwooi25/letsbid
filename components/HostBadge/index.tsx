import { cn } from '@/lib/utils';
import { LucideCrown } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function HostBadge({ className }: Props) {
  return (
    <div
      className={cn(
        'w-[32px] h-[32px] rounded-full bg-secondary flex items-center justify-center',
        className,
      )}
    >
      <LucideCrown className="w-4 h-4 text-yellow-500" />
    </div>
  );
}

type Props = {
  className?: HTMLAttributes<HTMLDivElement>['className'];
};
