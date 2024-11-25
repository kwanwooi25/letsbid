import Dropzone from '@/components/common/Dropzone/BaseDropzone';
import Icon from '@/components/ui/icon';
import type { ComponentProps, HTMLAttributes } from 'react';

export default function AuctionCaseImageForm({ className, onDrop }: Props) {
  const handleDrop: ComponentProps<typeof Dropzone>['onDrop'] = async (acceptedFiles) => {
    if (!acceptedFiles.length) return;

    onDrop?.(acceptedFiles);
  };
  return (
    <div className={className}>
      <Dropzone
        label={
          <div className="flex flex-col items-center gap-2 py-6">
            <Icon name="file-up" />
            <p className="text-center text-xs">사건 관련 이미지 추가</p>
          </div>
        }
        accept={{
          'image/*': [],
        }}
        onDrop={handleDrop}
      />
    </div>
  );
}

type Props = {
  className?: HTMLAttributes<HTMLDivElement>['className'];
  onDrop?: (imageFiles: File[]) => void;
};
