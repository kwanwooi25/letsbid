'use client';

import { GNB_HEIGHT } from '@/components/layouts/const';
import Logo from '@/components/common/Logo';
import { PATHS } from '@/const/paths';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import DesktopNavigation from './Navigation/DesktopNavigation';
import MobileNavigation from './Navigation/MobileNavigation';
import UserMenu from './UserMenu';

export default function GlobalHeader() {
  const session = useSession();
  const isLoggedIn = !!session.data?.user;

  return (
    <header
      className="py-2 px-4 sticky w-full top-0 z-header shadow-sm backdrop-blur border-b border-border/70 flex justify-between items-center"
      style={{ height: GNB_HEIGHT }}
    >
      <div className="flex md:hidden">{isLoggedIn && <MobileNavigation />}</div>
      <div className="flex-1 flex items-center justify-center md:justify-start gap-10">
        <Link href={PATHS.HOME}>
          <Logo wide size={36} />
        </Link>
        {isLoggedIn && (
          <div className="hidden md:flex">
            <DesktopNavigation />
          </div>
        )}
      </div>
      <UserMenu />
    </header>
  );
}