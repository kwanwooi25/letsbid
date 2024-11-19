import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import SignInForm from '@/components/pages/SignInForm';
import { PATHS } from '@/const/paths';
import { auth } from '@/features/auth';
import { redirect, RedirectType } from 'next/navigation';

export default async function SignIn() {
  const session = await auth();

  if (session?.user) return redirect(PATHS.HOME, RedirectType.replace);

  return (
    <>
      <PageHeader title="로그인" className="max-w-md" />
      <PageBody className="max-w-md">
        <SignInForm />
      </PageBody>
    </>
  );
}
