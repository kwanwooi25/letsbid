import Dropzone from '@/components/Dropzone/BaseDropzone';
import { Button } from '@/components/ui/button';
import { LucideFileUp, LucideX } from 'lucide-react';
import type { ComponentProps } from 'react';

export default function AuctionCaseImageForm({ imageFile, imageUrl, onChange, onRemove }: Props) {
  const handleDrop: ComponentProps<typeof Dropzone>['onDrop'] = async (acceptedFiles) => {
    if (!acceptedFiles.length) return;

    onChange?.({ imageFile: acceptedFiles[0] });
  };

  const hasImage = !!imageFile || !!imageUrl;
  if (hasImage) {
    return (
      <div className={'relative w-full h-full flex justify-center items-center'}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={'w-full object-contain'}
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
          <LucideX />
        </Button>
      </div>
    );
  }

  return (
    <Dropzone
      label={
        <div className="flex flex-col items-center gap-2 py-6">
          <LucideFileUp />
          <p className="text-center text-xs">사건 개요 이미지</p>
        </div>
      }
      accept={{
        'image/*': [],
      }}
      onDrop={handleDrop}
      maxFiles={1}
    />
  );
}

type Props = {
  imageFile?: File;
  imageUrl?: string | null;
  onChange?: (value: { imageFile?: File; imageUrl?: string }) => void;
  onRemove?: () => void;
};
