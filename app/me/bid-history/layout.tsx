import { getAppName } from '@/lib/env';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `내 입찰 기록 | ${getAppName()}`,
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
