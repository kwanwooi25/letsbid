import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

export default function Divider({ className, children }: Props) {
  if (!children) return <div className={cn('my-4 border-b', className)} />;

  return (
    <div className="flex items-center gap-4">
      <div className="w-full my-4 border-b" />
      <div className="shrink-0 text-xs text-primary/70">{children}</div>
      <div className="w-full my-4 border-b" />
    </div>
  );
}

type Props = PropsWithChildren & {
  className?: string;
};
