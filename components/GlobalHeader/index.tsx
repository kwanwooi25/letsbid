import { GNB_HEIGHT } from '@/const/layout';
import { PATHS } from '@/const/paths';
import Link from 'next/link';
import Logo from '../Logo';
import UserMenu from './UserMenu';

export default function GlobalHeader() {
  return (
    <header
      className="py-2 px-4 sticky w-full top-0 z-header shadow-sm backdrop-blur border-b border-border/70 flex justify-between items-center"
      style={{ height: GNB_HEIGHT }}
    >
      <div className="flex items-center">
        <Link href={PATHS.HOME} scroll={false}>
          <Logo wide size={36} />
        </Link>
      </div>
      <UserMenu />
    </header>
  );
}
