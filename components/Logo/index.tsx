import { getAppEnv, getAppEnvTag } from '@/lib/env';
import { cn } from '@/lib/utils';
import { default as LogoSquare } from '@/public/runforyou-logo.png';
import { default as LogoWide } from '@/public/runforyou_bid-logo.png';
import Image from 'next/image';

const LOGO_ASPECT_RATIO = 54 / 16;

export default function Logo({ size = 64, wide }: Props) {
  const src = wide ? LogoWide : LogoSquare;
  const width = wide ? size * LOGO_ASPECT_RATIO : size;
  const height = size;
  const appEnv = getAppEnv();
  const appEnvTag = getAppEnvTag();

  return (
    <div className="flex items-stretch">
      <Image src={src} alt="runforyou-bid app logo" width={width} height={height} priority />
      <div className="flex flex-col items-center justify-between">
        <span className="text-xs font-bold px-1 rounded-sm bg-secondary text-secondary-foreground">
          BETA
        </span>
        {appEnvTag && (
          <span
            className={cn(
              'text-xs font-bold px-1 rounded-sm bg-yellow-500 text-secondary-foreground',
              appEnv === 'local' && 'bg-rose-500',
              appEnv === 'development' && 'bg-orange-500',
            )}
          >
            {appEnvTag}
          </span>
        )}
      </div>
    </div>
  );
}

type Props = {
  size?: number;
  wide?: boolean;
};
