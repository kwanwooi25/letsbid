import MainLayout from '@/components/layouts/MainLayout';
import { Toaster } from '@/components/ui/toaster';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import Providers from './providers';

const notoSans = Noto_Sans_KR({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${process.env.NODE_ENV === 'development' ? '[DEV] ' : ''}Run4U Bid`,
  description: '부동산 경매 모의 입찰',
  icons: {
    icon: '/runforyou-logo.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(notoSans.className, 'min-h-screen flex flex-col antialiased')}
        suppressHydrationWarning
      >
        <Providers session={session}>
          <NextTopLoader color="gray" zIndex={99999} />
          <MainLayout>{children}</MainLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
