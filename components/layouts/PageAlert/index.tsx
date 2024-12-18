import { cn } from '@/lib/utils';
import { HTMLAttributes, PropsWithChildren } from 'react';

export default function PageAlert({ className, children }: Props) {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-destructive text-destructive-foreground">
      <div
        className={cn(
          'max-w-2xl mx-auto p-4 flex items-center justify-between text-sm md:text-base',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

type Props = PropsWithChildren & {
  className?: HTMLAttributes<HTMLDivElement>['className'];
};
