import { cn } from '@/lib/utils';
import { HTMLAttributes, PropsWithChildren } from 'react';

export default function PageBody({ children, className, ...props }: Props) {
  return (
    <div className={cn('mx-auto px-4', className)} {...props}>
      {children}
    </div>
  );
}

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;
