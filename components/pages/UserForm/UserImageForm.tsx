import UserImage from '@/components/common/UserImage';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { cn } from '@/lib/utils';
import { HTMLAttributes, InputHTMLAttributes, useRef } from 'react';

export default function UserImageForm({
  className,
  userImage,
  userImageToUpload,
  onChange,
  onRemove,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { loggedInUser } = useLoggedInUser();
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
              <Icon name="pen" size="14" />
            </Button>
            <Button
              onClick={onRemove}
              className="w-[28px] h-[28px]"
              variant="secondary"
              size="icon"
              type="button"
            >
              <Icon name="x" size="14" />
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
            <Icon name="plus" size="14" />
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
