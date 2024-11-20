import { cn } from '@/lib/utils';
import { LiHTMLAttributes } from 'react';
import { ListItemColor } from './types';

export default function ListItem({ className, color, children, ...props }: Props) {
  return (
    <li
      className={cn(
        'flex gap-4 items-center justify-between p-4 border border-secondary rounded-sm hover:bg-primary-foreground hover:cursor-pointer transition-colors',
        color === 'red' && 'text-red-700 bg-red-100/10 hover:bg-red-100/20 border-red-700/10',
        color === 'gray' && 'text-gray-500 bg-gray-100/10 hover:bg-gray-100/20 border-gray-700/10',
        color === 'yellow' &&
          'text-yellow-700 bg-yellow-100/10 hover:bg-yellow-100/20 border-yellow-700/10',
        color === 'green' &&
          'text-green-700 bg-green-100/10 hover:bg-green-100/20 border-green-700/10',
        className,
      )}
      {...props}
    >
      {children}
    </li>
  );
}

type Props = LiHTMLAttributes<HTMLLIElement> & { color?: ListItemColor };
