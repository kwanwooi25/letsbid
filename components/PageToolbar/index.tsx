import { GNB_HEIGHT, PAGE_HEADER_HEIGHT } from '@/const/layout';
import { cn } from '@/lib/utils';
import { HTMLAttributes, PropsWithChildren } from 'react';

export default function PageToolbar({
  className,
  children,
  breakpoint = 'lg',
  stickyTop = GNB_HEIGHT + PAGE_HEADER_HEIGHT,
}: Props) {
  return (
    <>
      <aside
        className={cn(
          breakpoint === 'sm' && 'sm:flex sm:flex-col sm:w-full sm:h-auto sm:sticky',
          breakpoint === 'md' && 'md:flex md:flex-col md:w-full md:h-auto md:sticky',
          breakpoint === 'lg' && 'lg:flex lg:flex-col lg:w-full lg:h-auto lg:sticky',
          breakpoint === 'xl' && 'xl:flex xl:flex-col xl:w-full xl:h-auto xl:sticky',
          breakpoint === '2xl' && '2xl:flex 2xl:flex-col 2xl:w-full 2xl:h-auto 2xl:sticky',
          className,
        )}
        style={{ top: `${stickyTop}px` }}
      >
        {children}
      </aside>
    </>
  );
}

type Props = PropsWithChildren & {
  className?: HTMLAttributes<HTMLElement>['className'];
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  stickyTop?: number;
};
