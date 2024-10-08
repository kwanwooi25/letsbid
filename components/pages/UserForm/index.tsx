'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import UserImage from '@/components/UserImage';
import { PATHS } from '@/const/paths';
import { useAxiosError } from '@/hooks/useAxiosError';
import { updateUserMutationOptions } from '@/queries/user/mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { LucideEdit2, LucidePlus, LucideX } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InputHTMLAttributes, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { formSchema, UserFormSchema } from './formSchema';

export default function UserForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;

  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const updateUserMutation = useMutation(updateUserMutationOptions);

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: user?.id,
      name: user?.name,
      image: user?.image ?? '',
    },
  });

  const [userImage, userImageToUpload] = useWatch({
    control: form.control,
    name: ['image', 'imageToUpload'],
  });
  const hasImage = !!userImageToUpload || !!userImage;

  if (!user) return null;

  const { isSubmitting } = form.formState;

  const submitForm = form.handleSubmit(async (values: UserFormSchema) => {
    try {
      const updatedUser = await updateUserMutation.mutateAsync(values);
      toast({
        description: <p>사용자 정보를 수정했습니다</p>,
        variant: 'success',
      });

      session?.update({
        ...session,
        user: updatedUser,
      });

      form.reset();
      router.replace(PATHS.ME, { scroll: false });
    } catch (error) {
      handleAxiosError(error);
    }
  });

  const handleClickEditImage = () => {
    inputRef.current?.click();
  };

  const handleClickAddImage = () => {
    inputRef.current?.click();
  };

  const handleClickRemoveImage = () => {
    form.setValue('image', '');
    form.setValue('imageToUpload', null);
    form.setValue('imageToDelete', user.image ?? '');
  };

  const handleChangeImageInput: InputHTMLAttributes<HTMLInputElement>['onChange'] = (e) => {
    if (e.target.files?.length) {
      form.setValue('imageToUpload', e.target.files[0]);
    }
    e.target.files = null;
  };

  return (
    <Form {...form}>
      <form>
        <PageHeader className="max-w-lg" title="내 정보 수정">
          <Button onClick={submitForm} isLoading={isSubmitting} type="submit">
            저장
          </Button>
          <Link href={PATHS.ME} passHref scroll={false}>
            <Button disabled={isSubmitting} type="button" variant="secondary">
              취소
            </Button>
          </Link>
        </PageHeader>
        <PageBody className="max-w-lg flex items-center gap-4">
          <div className="relative">
            <UserImage
              src={userImageToUpload ? URL.createObjectURL(userImageToUpload) : userImage}
              alt={user.name}
            />
            <div className="w-full absolute bottom-[-14px] flex items-center justify-center gap-2">
              {hasImage ? (
                <>
                  <Button
                    onClick={handleClickEditImage}
                    className="w-[28px] h-[28px]"
                    variant="secondary"
                    size="icon"
                    type="button"
                  >
                    <LucideEdit2 size="14" />
                  </Button>
                  <Button
                    onClick={handleClickRemoveImage}
                    className="w-[28px] h-[28px]"
                    variant="secondary"
                    size="icon"
                    type="button"
                  >
                    <LucideX size="14" />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleClickAddImage}
                  className="w-[28px] h-[28px]"
                  variant="secondary"
                  size="icon"
                  type="button"
                >
                  <LucidePlus size="14" />
                </Button>
              )}
              <input
                ref={inputRef}
                onChange={handleChangeImageInput}
                type="file"
                accept="image/*"
                hidden
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <InputFormField
              control={form.control}
              name="name"
              inputProps={{ autoFocus: true, placeholder: '이름' }}
              required
            />
            <span className="text-sm font-semibold text-primary/50">{user.email}</span>
          </div>
        </PageBody>
      </form>
    </Form>
  );
}
