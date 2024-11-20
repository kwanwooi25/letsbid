import { PropsWithChildren } from 'react';
import GlobalHeader from '../GlobalHeader';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <GlobalHeader />
      <main className="w-full flex-1 relative">{children}</main>
    </>
  );
}
