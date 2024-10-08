import { LucideUser2 } from 'lucide-react';
import Image from 'next/image';

export default function UserImage({ src, alt = 'user image', size = 64 }: Props) {
  return !!src ? (
    <Image
      className="rounded-full object-cover"
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
      className="flex items-center justify-center rounded-full bg-primary-foreground"
      style={{ width: size, height: size }}
    >
      <LucideUser2 className="w-[60%] h-[60%]" />
    </div>
  );
}

type Props = {
  src?: string | null;
  alt?: string;
  size?: number;
};
