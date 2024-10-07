import GlobalHeader from '@/components/GlobalHeader';
import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <GlobalHeader />
      <main className="w-full flex-1 relative">{children}</main>
    </>
  );
}
