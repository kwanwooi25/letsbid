'use client';

import { Button } from '@/components/ui/button';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { createUserMutationOptions } from '@/features/user/mutation';
import { useAxiosError } from '@/hooks/useAxiosError';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { LucideLogIn } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { formSchema, SignUpFormSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function SignUpForm() {
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { mutateAsync: createUser } = useMutation(createUserMutationOptions);
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues(searchParams.get('email') ?? ''),
  });
  const { isSubmitting } = form.formState;

  const submitForm = form.handleSubmit(async (values: SignUpFormSchema) => {
    try {
      const createdUser = await createUser(values);
      toast({
        title: `${createdUser.email} (${createdUser.name})`,

        description: '계정이 생성되었습니다',
        variant: 'success',
      });
      router.push(PATHS.SIGN_IN);
    } catch (error) {
      handleAxiosError(error);
    }
  });

  const moveToSignIn = () => router.push(PATHS.SIGN_IN);

  return (
    <Form {...form}>
      <form className="max-w-xl flex flex-col gap-4" onSubmit={submitForm}>
        <InputFormField
          control={form.control}
          name="name"
          label="이름"
          inputProps={{ autoFocus: true, required: true }}
          required
        />
        <InputFormField
          control={form.control}
          name="email"
          label="이메일"
          inputProps={{ required: true }}
          required
        />
        <InputFormField
          control={form.control}
          name="mobile"
          label="휴대폰 번호"
          inputProps={{ format: 'phoneNumber' }}
        />
        <InputFormField
          control={form.control}
          name="password"
          label="비밀번호"
          inputProps={{ type: 'password', required: true }}
          required
        />
        <InputFormField
          control={form.control}
          name="passwordConfirm"
          label="비밀번호 확인"
          inputProps={{ type: 'password', required: true }}
          required
        />

        <Button isLoading={isSubmitting} size="lg">
          가입하기
        </Button>

        <Button onClick={moveToSignIn} type="button" variant="link">
          <LucideLogIn className="mr-2 h-4 w-4" />
          로그인 하러가기
        </Button>
      </form>
    </Form>
  );
}
