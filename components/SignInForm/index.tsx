'use client';

import { PATHS } from '@/const/paths';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { zodResolver } from '@hookform/resolvers/zod';
import { LucideMail, LucideUserPlus } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import KakaoIcon from '../KakaoIcon';
import { Button } from '../ui/button';
import Divider from '../ui/divider';
import { Form, InputFormField } from '../ui/form';
import { SignInFormSchema, formSchema } from './formSchema';

export default function SignInForm() {
  const router = useRouter();
  const createQueryString = useCreateQueryString();
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { isSubmitting } = form.formState;

  const submitForm = form.handleSubmit(async (values: SignInFormSchema) => {
    // TODO
    console.log(values);
  });

  const moveToSignUp = () => {
    const { email } = form.getValues();
    let queryString = '';
    if (email) {
      queryString = createQueryString({ email });
    }
    router.push(`${PATHS.SIGN_UP}?${queryString}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        className="flex items-center gap-2 text-gray-900 bg-[#fee503] hover:bg-[#fee503]/80"
        onClick={() => signIn('kakao')}
        type="button"
        size="lg"
      >
        <KakaoIcon width={18} height={18} />
        카카오 로그인
      </Button>

      <Divider>또는</Divider>

      <Form {...form}>
        <form className="max-w-xl flex flex-col gap-4" onSubmit={submitForm}>
          <InputFormField
            control={form.control}
            name="email"
            label="이메일"
            inputProps={{ autoFocus: true }}
          />
          <InputFormField
            control={form.control}
            name="password"
            label="비밀번호"
            inputProps={{ type: 'password' }}
          />

          <Button isLoading={isSubmitting} size="lg">
            {!isSubmitting && <LucideMail className="mr-2 h-4 w-4" />}
            이메일 로그인
          </Button>

          <Button onClick={moveToSignUp} type="button" variant="link">
            <LucideUserPlus className="mr-2 h-4 w-4" />
            이메일로 가입
          </Button>
        </form>
      </Form>
    </div>
  );
}
