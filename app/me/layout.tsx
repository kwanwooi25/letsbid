import { auth } from '@/features/auth';
import { getAppName } from '@/lib/env';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();

  if (!session?.user) {
    return {};
  }

  return {
    title: `${session.user.name} | ${getAppName()}`,
  };
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
