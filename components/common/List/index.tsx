import { cn } from '@/lib/utils';
import { HTMLAttributes, PropsWithChildren } from 'react';

export default function List({ children, className }: Props) {
  return <ul className={cn('flex flex-col gap-2', className)}>{children}</ul>;
}

type Props = PropsWithChildren & {
  className?: HTMLAttributes<HTMLUListElement>['className'];
};
