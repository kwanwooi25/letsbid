'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { updateUserMutationOptions } from '@/features/user/mutation';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { formSchema, UserFormSchema } from './formSchema';
import UserImageForm from './UserImageForm';

export default function UserForm() {
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;

  const callbackUrl = useCallbackUrl();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const { mutateAsync: updateUser } = useMutation(updateUserMutationOptions);

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile ?? '',
      image: user?.image ?? '',
    },
  });

  const [userImage, userImageToUpload] = useWatch({
    control: form.control,
    name: ['image', 'imageToUpload'],
  });

  if (!user) return null;

  const { isSubmitting } = form.formState;

  const submitForm = form.handleSubmit(async (values: UserFormSchema) => {
    try {
      const updatedUser = await updateUser(values);
      toast({
        description: <p>사용자 정보를 수정했습니다</p>,
        variant: 'success',
      });

      session?.update({
        ...session,
        user: updatedUser,
      });

      form.reset();
      router.replace(callbackUrl ? callbackUrl : PATHS.ME);
    } catch (error) {
      handleAxiosError(error);
    }
  });

  const handleRemoveImage = () => {
    form.setValue('image', '');
    form.setValue('imageToUpload', null);
    form.setValue('imageToDelete', user.image ?? '');
  };

  const handleChangeImage: ComponentProps<typeof UserImageForm>['onChange'] = (imageFile) => {
    form.setValue('imageToUpload', imageFile);
  };

  return (
    <Form {...form}>
      <form>
        <PageHeader className="max-w-lg" title="내 정보 수정">
          <Button onClick={submitForm} isLoading={isSubmitting} type="submit">
            저장
          </Button>
          <Link href={callbackUrl ? callbackUrl : PATHS.ME} passHref>
            <Button disabled={isSubmitting} type="button" variant="secondary">
              취소
            </Button>
          </Link>
        </PageHeader>
        <PageBody className="max-w-lg flex items-center gap-4">
          <UserImageForm
            className="self-start"
            userImage={userImage}
            userImageToUpload={userImageToUpload}
            onChange={handleChangeImage}
            onRemove={handleRemoveImage}
          />
          <div className="flex-1 flex flex-col gap-2">
            <InputFormField
              control={form.control}
              name="name"
              label="이름"
              inputProps={{ autoFocus: true }}
              required
            />
            <InputFormField
              control={form.control}
              name="email"
              label="이메일"
              inputProps={{ readOnly: true }}
              required
            />
            <InputFormField
              control={form.control}
              name="mobile"
              label="휴대폰 번호"
              inputProps={{ format: 'phoneNumber' }}
            />
          </div>
        </PageBody>
      </form>
    </Form>
  );
}
