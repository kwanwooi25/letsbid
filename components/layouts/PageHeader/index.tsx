'use client';

import { GNB_HEIGHT } from '@/components/layouts/const';
import Icon from '@/components/ui/icon';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';
import { Button } from '../../ui/button';

export default function PageHeader({
  className,
  title,
  children,
  backButton,
  previousUrl,
  onBackButtonClick,
  hideBottomBorderOnScroll = false,
}: Props) {
  const router = useRouter();
  const callbackUrl = useCallbackUrl();
  const { isScrolled } = useWindowScroll();

  const handleClickBackButton = () => {
    if (onBackButtonClick) {
      onBackButtonClick();
      return;
    }

    if (callbackUrl) {
      router.replace(callbackUrl);
      return;
    }

    if (previousUrl) {
      router.replace(previousUrl);
      return;
    }

    router.back();
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 p-4 mx-auto sticky bg-background z-header min-h-[72px]',
        isScrolled && !hideBottomBorderOnScroll && 'border-b',
        className,
      )}
      style={{ top: GNB_HEIGHT }}
    >
      <div className="flex items-center gap-2 flex-1">
        {!!backButton && (
          <Button onClick={handleClickBackButton} variant="ghost" size="icon" type={'button'}>
            <Icon name="chevron-left" />
          </Button>
        )}
        {!!backButton && typeof backButton !== 'boolean' && backButton}
        {!!title && typeof title === 'string' && <h2 className="text-lg font-bold">{title}</h2>}
        {!!title && typeof title !== 'string' && title}
      </div>
      {!!children && <div className="flex items-center gap-2 self-end">{children}</div>}
    </div>
  );
}

type Props = PropsWithChildren & {
  className?: string;
  title?: ReactNode;
  backButton?: boolean | ReactNode;
  previousUrl?: string;
  onBackButtonClick?: () => void;
  hideBottomBorderOnScroll?: boolean;
};
