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
        'rounded-full',
        size === 'sm' && (icon ? 'p-1' : 'px-2 py-1'),
        size === 'md' && (icon ? 'p-2' : 'px-4 py-2'),
        size === 'lg' && (icon ? 'p-4' : 'px-8 py-4'),
        variant === 'primary' && 'bg-primary text-primary-foreground',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground',
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
  variant?: 'primary' | 'secondary';
  icon?: boolean;
  className?: string;
  style?: HTMLAttributes<'div'>['style'];
}>;

export { Chip };
