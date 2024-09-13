import * as React from 'react';

import { cn } from '@/lib/utils';
import { Format, useFormatter } from './hooks';
import { getDefaultMaxLength } from './utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  format?: Format;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, format, value, maxLength, onChange, ...props }, ref) => {
    const [formatter, formatRemover] = useFormatter({ format, maxLength });

    const formattedValue = formatter(value || typeof value === 'number' ? String(value) : '');

    const defaultMaxLength = getDefaultMaxLength(format);

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        value={formattedValue}
        onChange={(e) => {
          e.target.value = formatRemover(e.target.value);
          onChange?.(e);
        }}
        maxLength={maxLength || defaultMaxLength}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
