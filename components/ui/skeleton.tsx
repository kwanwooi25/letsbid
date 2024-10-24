import { cn } from '@/lib/utils';
import PageHeader from '../PageHeader';
import { ComponentProps, PropsWithChildren } from 'react';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
}

function InputSkeleton({ className, hideLabel }: { className?: string; hideLabel?: boolean }) {
  return (
    <div className={cn('space-y-2', className)}>
      {!hideLabel && <Skeleton className="h-5 w-20" />}
      <Skeleton className="h-10 w-full mt-2" />
    </div>
  );
}

function ButtonSkeleton({ className, icon }: { className?: string; icon?: boolean }) {
  return <Skeleton className={cn('h-[40px] w-[60px]', icon && 'w-[40px]', className)} />;
}

function PageHeaderSkeleton({
  children,
  className,
  title,
  backButton,
  actionButtonCount = 0,
}: PropsWithChildren<{
  className?: ComponentProps<typeof PageHeader>['className'];
  title?: ComponentProps<typeof PageHeader>['title'];
  backButton?: boolean;
  actionButtonCount?: number;
}>) {
  return (
    <PageHeader
      title={title ?? <Skeleton className="h-7 w-20" />}
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
Skeleton.Button = ButtonSkeleton;
Skeleton.PageHeader = PageHeaderSkeleton;

export { Skeleton };
