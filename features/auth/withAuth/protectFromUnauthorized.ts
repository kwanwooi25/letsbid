import { PATHS } from '@/const/paths';
import { Session } from 'next-auth';
import { redirect, RedirectType } from 'next/navigation';
import { appendCallbackUrl } from './appendCallbackUrl';

export async function protectFromUnauthorized({ session }: Args) {
  const redirectUrl = appendCallbackUrl(PATHS.SIGN_IN);

  if (!session?.user) return redirect(redirectUrl, RedirectType.push);
}

type Args = {
  session?: Session | null;
};
