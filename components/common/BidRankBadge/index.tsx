import { cn } from '@/lib/utils';
import { HTMLAttributes, ReactNode } from 'react';

export default function BidRankBadge({ rank, className }: Props) {
  return (
    <div
      className={cn(
        'flex items-center justify-center min-h-[24px] w-[48px] p-[0.15rem] border-2 bg-primary-foreground text-xs text-center rotate-[-8deg] line-clamp-1',
        rank === 1 && 'text-red-500 border-red-500',
        rank === 2 && 'text-orange-500 border-orange-500',
        className,
      )}
    >
      {rank === 1 ? '낙찰' : rank === 2 ? '차순위' : typeof rank === 'number' ? `${rank}위` : rank}
    </div>
  );
}

type Props = {
  rank?: ReactNode;
  className?: HTMLAttributes<HTMLDivElement>['className'];
};
