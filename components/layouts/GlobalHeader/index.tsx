'use client';

import Logo from '@/components/common/Logo';
import { GNB_HEIGHT } from '@/components/layouts/const';
import { PATHS } from '@/const/paths';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import Link from 'next/link';
import DesktopNavigation from './Navigation/DesktopNavigation';
import MobileNavigation from './Navigation/MobileNavigation';
import UserMenu from './UserMenu';

export default function GlobalHeader() {
  const { isLoggedIn } = useLoggedInUser();

  return (
    <header
      className="sticky w-full top-0 z-header shadow-sm bg-background border-b border-border/70"
      style={{ height: GNB_HEIGHT }}
    >
      <div className="max-w-2xl mx-auto lg:max-w-5xl py-2 px-4 flex justify-between items-center">
        <div className="flex lg:hidden">{isLoggedIn && <MobileNavigation />}</div>
        <div className="flex-1 flex items-center justify-center lg:justify-start gap-10">
          <Link href={PATHS.HOME}>
            <Logo wide size={36} />
          </Link>
          {isLoggedIn && (
            <div className="hidden lg:flex">
              <DesktopNavigation />
            </div>
          )}
        </div>
        <UserMenu />
      </div>
    </header>
  );
}
