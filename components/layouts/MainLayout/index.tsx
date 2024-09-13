import GlobalHeader from '@/components/GlobalHeader';
import { GNB_HEIGHT } from '@/const/layout';
import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <GlobalHeader />
      <main className="w-full flex-1 relative" style={{ marginTop: GNB_HEIGHT }}>
        {children}
      </main>
    </>
  );
}
