'use client';

import { GNB_HEIGHT } from '@/const/layout';
import { cn } from '@/lib/utils';
import { LucideChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';
import { Button } from '../ui/button';

export default function PageHeader({
  className,
  title,
  children,
  backButton,
  onBackButtonClick,
}: Props) {
  const router = useRouter();

  const handleClickBackButton = () => {
    if (onBackButtonClick) {
      onBackButtonClick();
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
        {!!backButton && typeof backButton === 'boolean' && !onBackButtonClick && (
          <Link href=".." passHref scroll={false}>
            <Button variant="ghost" size="icon" type={'button'}>
              <LucideChevronLeft />
            </Button>
          </Link>
        )}
        {!!backButton && typeof backButton === 'boolean' && !!onBackButtonClick && (
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
  onBackButtonClick?: () => void;
};
