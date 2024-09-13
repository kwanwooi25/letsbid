import { default as LogoSquare, default as LogoWithText } from '@/public/letsbid_logo.png';
import Image from 'next/image';

export default function Logo({ size = 64, withText = false }: Props) {
  if (withText) {
    const fontSize = size / 1.8;

    return (
      <div className="flex items-center gap-2">
        <Image src={LogoWithText} alt="letsbid app logo" width={size} height={size} />
        <span className="font-black" style={{ fontSize }}>
          {"Let's bid!"}
        </span>
      </div>
    );
  }

  return <Image src={LogoSquare} alt="letsbid app logo" width={size} height={size} />;
}

type Props = {
  size?: number;
  withText?: boolean;
};
