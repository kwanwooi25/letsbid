import { cn } from '@/lib/utils';
import { HTMLAttributes, PropsWithChildren } from 'react';

const Chip = ({
  variant = 'primary',
  size = 'md',
  icon = false,
  className,
  style,
  children,
}: Props) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full shrink-0',
        size === 'sm' && (icon ? 'p-1 w-8 h-8' : 'px-2 py-1'),
        size === 'md' && (icon ? 'p-2 w-10 h-10' : 'px-4 py-2'),
        size === 'lg' && (icon ? 'p-4 w-14 h-14' : 'px-8 py-4'),
        variant === 'primary' && 'bg-primary text-primary-foreground',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground',
        variant === 'success' && 'bg-green-700 text-white',
        variant === 'destruptive' && 'bg-destructive text-destruptive-foreground',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
};

type Props = PropsWithChildren<{
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'destruptive';
  icon?: boolean;
  className?: string;
  style?: HTMLAttributes<'div'>['style'];
}>;

export { Chip };
