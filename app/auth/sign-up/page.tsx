import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import SignUpForm from './components/SignUpForm';

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
