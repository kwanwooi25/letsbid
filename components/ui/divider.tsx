import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export default function Divider({ className, children, direction = 'horizontal' }: Props) {
  if (!children)
    return (
      <div
        className={cn(
          direction === 'horizontal' && 'my-4 border-b',
          direction === 'vertical' && 'mx-4 border-r',
          className,
        )}
      />
    );

  return (
    <div
      className={cn(
        'flex gap-4',
        direction === 'horizontal' && 'flex-row items-center',
        direction === 'vertical' && 'flex-col',
        className,
      )}
    >
      <div
        className={cn(
          'flex-1',
          direction === 'horizontal' && 'my-4 border-b',
          direction === 'vertical' && 'mx-4 border-r',
        )}
      />
      <div
        className={cn(
          'shrink-0 text-xs text-center text-primary/70',
          direction === 'vertical' && '-rotate-90',
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          'flex-1',
          direction === 'horizontal' && 'my-4 border-b',
          direction === 'vertical' && 'mx-4 border-r',
        )}
      />
    </div>
  );
}

type Props = PropsWithChildren & {
  className?: string;
  direction?: 'vertical' | 'horizontal';
};
