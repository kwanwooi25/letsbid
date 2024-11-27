import MainLayout from '@/components/layouts/MainLayout';
import { Toaster } from '@/components/ui/toaster';
import { auth } from '@/features/auth';
import { getAppName } from '@/lib/env';
import { cn } from '@/lib/utils';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { headers } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import Providers from './providers';

const notoSans = Noto_Sans_KR({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const host = headers().get('host');

  return {
    metadataBase: new URL(`https://${host}`),
    title: getAppName(),
    description: '부동산 경매 모의 입찰 시스템',
    icons: {
      icon: '/letsbid_logo.png',
    },
  };
}

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
          {/* TODO: 개인 정보 수집 동의 필요 */}
          {/* <MobileNumberChecker /> */}
        </Providers>
      </body>
    </html>
  );
}
