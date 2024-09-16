import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export default function ListEmpty({ children, className, message }: Props) {
  return (
    <div className={cn('py-6 px-4 text-center text-lg font-bold text-primary/70', className)}>
      {children ?? message}
    </div>
  );
}

type Props = PropsWithChildren & {
  className?: string;
  message?: string;
};
