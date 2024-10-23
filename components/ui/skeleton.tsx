import { cn } from '@/lib/utils';
import PageHeader from '../PageHeader';
import { ComponentProps, PropsWithChildren } from 'react';

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

function PageHeaderSkeleton({
  children,
  className,
  backButton,
  actionButtonCount = 0,
}: PropsWithChildren<{
  className?: ComponentProps<typeof PageHeader>['className'];
  backButton?: boolean;
  actionButtonCount?: number;
}>) {
  return (
    <PageHeader
      title={<Skeleton className="h-7 w-20" />}
      className={className}
      backButton={backButton}
    >
      {children}
      {actionButtonCount > 0 &&
        Array.from(Array(actionButtonCount)).map((n, i) => (
          <Skeleton key={`${n}_${i}`} className="h-10 w-14" />
        ))}
    </PageHeader>
  );
}

Skeleton.Input = InputSkeleton;
Skeleton.PageHeader = PageHeaderSkeleton;

export { Skeleton };
