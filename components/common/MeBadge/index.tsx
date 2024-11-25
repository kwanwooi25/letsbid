import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export default function MeBadge({ className }: Props) {
  return (
    <div className={cn('relative translate-y-[-8px] rotate-[10deg] text-green-600', className)}>
      <Icon name="message-circle" className="w-8 h-8" />
      <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xs font-bold">
        ME
      </span>
    </div>
  );
}

type Props = {
  className?: HTMLAttributes<HTMLDivElement>['className'];
};
