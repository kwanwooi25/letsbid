'use client';

import KakaoIcon from '@/components/KakaoIcon';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { loginUserMutationOptions } from '@/features/user/mutation';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { LucideMail, LucideUserPlus } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignInFormSchema, formSchema } from './formSchema';

export default function SignInForm() {
  const [isKakaoLoggingIn, setIsKakaoLoggingIn] = useState(false);
  const router = useRouter();
  const createQueryString = useCreateQueryString();
  const { mutateAsync: loginUser } = useMutation(loginUserMutationOptions);
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const callbackUrl = useCallbackUrl();
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { isSubmitting } = form.formState;

  const submitForm = form.handleSubmit(async (values: SignInFormSchema) => {
    try {
      const loggedInUser = await loginUser(values);
      await signIn('credentials', {
        user: JSON.stringify(loggedInUser),
        callbackUrl: callbackUrl ?? PATHS.HOME,
      });
      toast({
        title: `${loggedInUser.name}님 환영합니다`,
        variant: 'success',
      });
    } catch (error) {
      handleAxiosError(error);
    }
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
        onClick={async () => {
          setIsKakaoLoggingIn(true);
          await signIn('kakao', { callbackUrl: callbackUrl ?? PATHS.HOME });
          setIsKakaoLoggingIn(false);
        }}
        type="button"
        size="lg"
        isLoading={isKakaoLoggingIn}
      >
        {!isKakaoLoggingIn && <KakaoIcon width={18} height={18} />}
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
