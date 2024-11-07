import { Button } from '@/components/ui/button';
import UserImage from '@/components/UserImage';
import { cn } from '@/lib/utils';
import { LucideEdit2, LucidePlus, LucideX } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { HTMLAttributes, InputHTMLAttributes, useRef } from 'react';

export default function UserImageForm({
  className,
  userImage,
  userImageToUpload,
  onChange,
  onRemove,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const session = useSession();
  const loggedInUser = session?.data?.user;
  const hasImage = !!userImageToUpload || !!userImage;

  const handleClickEditImage = () => {
    inputRef.current?.click();
  };

  const handleClickAddImage = () => {
    inputRef.current?.click();
  };

  const handleChangeImageInput: InputHTMLAttributes<HTMLInputElement>['onChange'] = (e) => {
    if (e.target.files?.length) {
      onChange?.(e.target.files[0]);
    }
    e.target.files = null;
  };

  return (
    <div className={cn('relative', className)}>
      <UserImage
        src={userImageToUpload ? URL.createObjectURL(userImageToUpload) : userImage}
        alt={loggedInUser?.name}
      />
      <div className="w-full absolute bottom-[-14px] flex items-center justify-center gap-2">
        {hasImage ? (
          <>
            <Button
              onClick={handleClickEditImage}
              className="w-[28px] h-[28px]"
              variant="secondary"
              size="icon"
              type="button"
            >
              <LucideEdit2 size="14" />
            </Button>
            <Button
              onClick={onRemove}
              className="w-[28px] h-[28px]"
              variant="secondary"
              size="icon"
              type="button"
            >
              <LucideX size="14" />
            </Button>
          </>
        ) : (
          <Button
            onClick={handleClickAddImage}
            className="w-[28px] h-[28px]"
            variant="secondary"
            size="icon"
            type="button"
          >
            <LucidePlus size="14" />
          </Button>
        )}
        <input
          ref={inputRef}
          onChange={handleChangeImageInput}
          type="file"
          accept="image/*"
          hidden
        />
      </div>
    </div>
  );
}

type Props = {
  className?: HTMLAttributes<HTMLDivElement>['className'];
  userImage?: string;
  userImageToUpload?: File;
  onChange?: (imageFile: File) => void;
  onRemove?: () => void;
};
