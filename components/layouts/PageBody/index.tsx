import { cn } from '@/lib/utils';
import { HTMLAttributes, PropsWithChildren } from 'react';

export default function PageBody({ children, className, ...props }: Props) {
  return (
    <div className={cn('px-4 py-2 mx-auto', className)} {...props}>
      {children}
    </div>
  );
}

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;
