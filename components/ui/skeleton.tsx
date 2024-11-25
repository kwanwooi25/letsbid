import { cn } from '@/lib/utils';
import { ComponentProps, PropsWithChildren } from 'react';
import PageHeader from '../layouts/PageHeader';

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
  return (
    <Skeleton className={cn('h-[40px] w-[60px]', icon && 'w-[40px] rounded-full', className)} />
  );
}

function PageHeaderSkeleton({
  children,
  className,
  title,
  backButton,
  actionButtonCount = 0,
  actionButtonType = 'default',
}: PropsWithChildren<{
  className?: ComponentProps<typeof PageHeader>['className'];
  title?: ComponentProps<typeof PageHeader>['title'];
  backButton?: boolean;
  actionButtonCount?: number;
  actionButtonType?: 'default' | 'icon';
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
          <Skeleton
            key={`${n}_${i}`}
            className={cn(
              actionButtonType === 'default' && 'h-10 w-14',
              actionButtonType === 'icon' && 'w-10 h-10 rounded-full',
            )}
          />
        ))}
    </PageHeader>
  );
}

Skeleton.Input = InputSkeleton;
Skeleton.Button = ButtonSkeleton;
Skeleton.PageHeader = PageHeaderSkeleton;

export { Skeleton };
