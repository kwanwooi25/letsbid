import { cn } from '@/lib/utils';
import PageHeader from '../PageHeader';
import { PropsWithChildren } from 'react';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
}

function InputSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      <Skeleton className="h-5 w-20" />
      <Skeleton className="h-10 w-full mt-2" />
    </div>
  );
}

function PageHeaderSkeleton({ children, withButton }: PropsWithChildren<{ withButton?: boolean }>) {
  return (
    <PageHeader title={<Skeleton className="h-7 w-20" />}>
      {children}
      {withButton && <Skeleton className="h-10 w-20" />}
    </PageHeader>
  );
}

Skeleton.Input = InputSkeleton;
Skeleton.PageHeader = PageHeaderSkeleton;

export { Skeleton };
