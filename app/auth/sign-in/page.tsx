import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import SignInForm from '@/components/pages/SignInForm';

export default function SignIn() {
  return (
    <>
      <PageHeader title="로그인" className="max-w-md" />
      <PageBody className="max-w-md">
        <SignInForm />
      </PageBody>
    </>
  );
}
