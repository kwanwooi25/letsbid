import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export default function SectionHeader({ className, children }: Props) {
  return (
    <h6 className={cn('text-lg font-semibold text-primary/70 border-b py-2', className)}>
      {children}
    </h6>
  );
}

type Props = PropsWithChildren & {
  className?: string;
};
