import { default as LogoSquare } from '@/public/runforyou-logo.png';
import { default as LogoWide } from '@/public/runforyou_bid-logo.png';
import Image from 'next/image';

const LOGO_ASPECT_RATIO = 54 / 16;

export default function Logo({ size = 64, wide }: Props) {
  const src = wide ? LogoWide : LogoSquare;
  const width = wide ? size * LOGO_ASPECT_RATIO : size;
  const height = size;

  return (
    <div className="relative">
      <Image src={src} alt="runforyou-bid app logo" width={width} height={height} />
      <span className="absolute top-0 right-0 translate-x-[100%] text-xs font-bold px-1 rounded-sm bg-secondary text-secondary-foreground">
        BETA
      </span>
      {process.env.NODE_ENV === 'development' && (
        <span className="absolute bottom-0 right-0 translate-x-[100%] text-xs font-bold px-1 rounded-sm bg-yellow-500 text-secondary-foreground">
          DEV
        </span>
      )}
    </div>
  );
}

type Props = {
  size?: number;
  wide?: boolean;
};
