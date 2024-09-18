import { cn } from '@/lib/utils';
import { HTMLAttributes, ReactNode } from 'react';

export default function DetailRow({ label, labelClassName, value, valueClassName }: Props) {
  return (
    <div className="flex items-center justify-between">
      <span className={cn('text-sm font-semibold text-primary/50', labelClassName)}>{label}</span>
      <span className={cn('text-lg font-bold', valueClassName)}>{value}</span>
    </div>
  );
}

type Props = {
  label: ReactNode;
  labelClassName?: HTMLAttributes<HTMLSpanElement>['className'];
  value: ReactNode;
  valueClassName?: HTMLAttributes<HTMLSpanElement>['className'];
};
