import { Button } from '@/components/ui/button';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useAxiosError } from '@/hooks/useAxiosError';
import { updateUserMutationOptions } from '@/queries/user/mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { formSchema, UserFormSchema } from './formSchema';

export default function UserForm({ user, onSubmit }: Props) {
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const updateUserMutation = useMutation(updateUserMutationOptions);
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: user.id,
      name: user.name,
    },
  });
  const { isSubmitting } = form.formState;

  const submitForm = form.handleSubmit(async (values: UserFormSchema) => {
    try {
      const updatedUser = await updateUserMutation.mutateAsync(values);
      toast({
        description: <p>사용자 정보를 수정했습니다</p>,
        variant: 'success',
      });
      onSubmit?.(updatedUser);
      form.reset();
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return (
    <Form {...form}>
      <form className="max-w-xl flex items-end gap-2">
        <InputFormField
          control={form.control}
          name="name"
          label="이름"
          inputProps={{ autoFocus: true }}
        />
        <Button onClick={submitForm} isLoading={isSubmitting} type="submit">
          저장
        </Button>
      </form>
    </Form>
  );
}

type Props = {
  user: User;
  onSubmit?: (updatedUser: User) => void | Promise<void>;
};
