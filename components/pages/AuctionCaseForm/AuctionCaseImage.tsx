import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export default function AuctionCaseImage({ className, imageFile, imageUrl, onRemove }: Props) {
  return (
    <div className={cn('relative w-full h-full flex justify-center items-center', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={'w-full aspect-square object-cover rounded-md'}
        src={imageUrl || URL.createObjectURL(imageFile!)}
        alt={'product option image'}
      />
      <Button
        onClick={onRemove}
        className="absolute top-1 right-1"
        variant="destructive"
        size="icon"
        type="button"
        tabIndex={-1}
      >
        <Icon name="x" />
      </Button>
    </div>
  );
}

type Props =
  | {
      className?: HTMLAttributes<HTMLDivElement>['className'];
      imageFile: File;
      imageUrl?: never;
      onRemove?: () => void;
    }
  | {
      className?: HTMLAttributes<HTMLDivElement>['className'];
      imageFile?: never;
      imageUrl: string;
      onRemove?: () => void;
    };
