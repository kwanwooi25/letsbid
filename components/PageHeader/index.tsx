'use client';

import { GNB_HEIGHT } from '@/const/layout';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { cn } from '@/lib/utils';
import { LucideChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';
import { Button } from '../ui/button';

export default function PageHeader({
  className,
  title,
  children,
  backButton,
  previousUrl,
  onBackButtonClick,
}: Props) {
  const router = useRouter();
  const callbackUrl = useCallbackUrl();

  const handleClickBackButton = () => {
    if (onBackButtonClick) {
      onBackButtonClick();
      return;
    }

    if (callbackUrl) {
      router.replace(callbackUrl, { scroll: false });
      return;
    }

    if (previousUrl) {
      router.replace(previousUrl, { scroll: false });
      return;
    }

    router.back();
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 mx-auto sticky backdrop-blur z-header',
        className,
      )}
      style={{ top: GNB_HEIGHT }}
    >
      <div className="flex items-center gap-2">
        {!!backButton && (
          <Button onClick={handleClickBackButton} variant="ghost" size="icon" type={'button'}>
            <LucideChevronLeft />
          </Button>
        )}
        {!!backButton && typeof backButton !== 'boolean' && backButton}
        {!!title && typeof title === 'string' && <h2 className="text-lg font-bold">{title}</h2>}
        {!!title && typeof title !== 'string' && title}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

type Props = PropsWithChildren & {
  className?: string;
  title?: ReactNode;
  backButton?: boolean | ReactNode;
  previousUrl?: string;
  onBackButtonClick?: () => void;
};
