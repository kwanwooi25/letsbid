import { PATHS } from '@/const/paths';
import { auth } from '@/features/auth';
import { redirect, RedirectType } from 'next/navigation';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session?.user) return redirect(PATHS.HOME, RedirectType.replace);

  return children;
}
