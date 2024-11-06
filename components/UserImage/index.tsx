import { cn } from '@/lib/utils';
import { LucideUser2 } from 'lucide-react';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

export default function UserImage({ className, src, alt = 'user image', size = 64 }: Props) {
  return !!src ? (
    <Image
      className={cn('rounded-full object-cover', className)}
      style={{
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,
      }}
      src={src}
      alt={alt}
      width={size}
      height={size}
    />
  ) : (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-primary-foreground',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <LucideUser2 className="w-[60%] h-[60%]" />
    </div>
  );
}

type Props = {
  className?: HTMLAttributes<HTMLDivElement>['className'];
  src?: string | null;
  alt?: string;
  size?: number;
};
