'use client';

import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { Button } from '@/components/ui/button';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { updateUserMutationOptions } from '@/features/user/mutation';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { formSchema, UserFormSchema } from './formSchema';
import UserImageForm from './UserImageForm';

export default function UserForm() {
  const router = useRouter();
  const { loggedInUser, updateLoggedInUser } = useLoggedInUser();

  const callbackUrl = useCallbackUrl();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const { mutateAsync: updateUser } = useMutation(updateUserMutationOptions);

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: loggedInUser?.id,
      name: loggedInUser?.name,
      email: loggedInUser?.email,
      mobile: loggedInUser?.mobile ?? '',
      image: loggedInUser?.image ?? '',
    },
  });

  const [userImage, userImageToUpload] = useWatch({
    control: form.control,
    name: ['image', 'imageToUpload'],
  });

  if (!loggedInUser) return null;

  const { isSubmitting } = form.formState;

  const submitForm = form.handleSubmit(async (values: UserFormSchema) => {
    try {
      const updatedUser = await updateUser(values);
      toast({
        description: <p>사용자 정보를 수정했습니다</p>,
        variant: 'success',
      });

      updateLoggedInUser(updatedUser);

      form.reset();
      router.replace(callbackUrl ? callbackUrl : PATHS.ME);
    } catch (error) {
      handleAxiosError(error);
    }
  });

  const handleRemoveImage = () => {
    form.setValue('image', '');
    form.setValue('imageToUpload', null);
    form.setValue('imageToDelete', loggedInUser?.image ?? '');
  };

  const handleChangeImage: ComponentProps<typeof UserImageForm>['onChange'] = (imageFile) => {
    form.setValue('imageToUpload', imageFile);
  };

  return (
    <Form {...form}>
      <form className="max-w-2xl lg:max-w-5xl mx-auto">
        <PageHeader className="lg:mx-[176px]" title="내 정보 수정">
          <Button onClick={submitForm} isLoading={isSubmitting} type="submit">
            저장
          </Button>
          <Link href={callbackUrl ? callbackUrl : PATHS.ME} passHref>
            <Button disabled={isSubmitting} type="button" variant="secondary">
              취소
            </Button>
          </Link>
        </PageHeader>
        <PageBody className="lg:mx-[176px] flex items-center gap-4">
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
