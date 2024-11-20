import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import SignUpForm from '@/components/pages/SignUpForm';

export default function SignUp() {
  return (
    <>
      <PageHeader title="이메일로 가입하기" className="max-w-md" />
      <PageBody className="max-w-md">
        <SignUpForm />
      </PageBody>
    </>
  );
}
