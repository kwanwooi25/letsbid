import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import SignInForm from '@/components/SignInForm';

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
