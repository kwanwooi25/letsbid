import { cn } from '@/lib/utils';

export default function Loading({ fullscreen, size = 'md' }: Props) {
  if (fullscreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary-foreground/30 z-loader">
        <div
          className={cn(
            'border-gray-300 animate-spin rounded-full  border-t-transparent h-16 w-16 border-4 my-16',
          )}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'border-gray-300 animate-spin rounded-full  border-t-transparent',
          size === 'sm' && 'h-6 w-6 border-2 my-6',
          size === 'md' && 'h-10 w-10 border-4 my-10',
          size === 'lg' && 'h-16 w-16 border-4 my-16',
        )}
      />
    </div>
  );
}

type Props = {
  fullscreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
};
