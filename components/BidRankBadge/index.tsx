import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export default function BidRankBadge({ rank, className }: Props) {
  return (
    <span
      className={cn(
        'w-[48px] p-[0.15rem] border-2 bg-primary-foreground text-xs text-center rotate-[-8deg] line-clamp-1',
        rank === 1 && 'text-red-500 border-red-500',
        rank === 2 && 'text-orange-500 border-orange-500',
        className,
      )}
    >
      {rank === 1 ? '낙찰' : rank === 2 ? '차순위' : `${rank}위`}
    </span>
  );
}

type Props = {
  rank: number;
  className?: HTMLAttributes<HTMLSpanElement>['className'];
};
