import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export default function BidRankBadge({ rank, isExcluded, className }: Props) {
  return (
    <span
      className={cn(
        'w-[42px] p-[0.15rem] border-2 bg-primary-foreground text-xs text-center rotate-[-8deg]',
        rank === 1 && 'text-red-500 border-red-500',
        rank === 2 && 'text-orange-500 border-orange-500',
        isExcluded && 'text-gray-500 border-gray-500',
        className,
      )}
    >
      {isExcluded ? '제외' : rank === 1 ? '낙찰' : rank === 2 ? '차순위' : `${rank}순위`}
    </span>
  );
}

type Props = {
  rank: number;
  isExcluded?: boolean;
  className?: HTMLAttributes<HTMLSpanElement>['className'];
};
