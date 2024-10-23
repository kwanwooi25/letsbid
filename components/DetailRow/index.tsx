import { cn } from '@/lib/utils';
import { HTMLAttributes, ReactNode } from 'react';
import { Skeleton } from '../ui/skeleton';

export default function DetailRow({ label, labelClassName, value, valueClassName }: Props) {
  return (
    <div className="flex items-center justify-between">
      <span className={cn('text-sm font-semibold text-primary/50', labelClassName)}>{label}</span>
      <span className={cn('text-lg font-bold', valueClassName)}>{value}</span>
    </div>
  );
}

function DetailRowSkeleton({
  label,
  labelClassName,
}: {
  label?: Props['label'];
  labelClassName?: Props['labelClassName'];
}) {
  return (
    <div className="flex items-center justify-between">
      {typeof label === 'string' ? (
        <span className={cn('text-sm font-semibold text-primary/50', labelClassName)}>{label}</span>
      ) : (
        label ?? <Skeleton className="h-[20px] w-[70px]" />
      )}
      <Skeleton className="h-[28px] w-[100px]" />
    </div>
  );
}

DetailRow.Skeleton = DetailRowSkeleton;

type Props = {
  label: ReactNode;
  labelClassName?: HTMLAttributes<HTMLSpanElement>['className'];
  value: ReactNode;
  valueClassName?: HTMLAttributes<HTMLSpanElement>['className'];
};
