import { Button } from '@/components/ui/button';
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  ScrollableDialogContent,
} from '@/components/ui/dialog';
import { Form, InputFormField } from '@/components/ui/form';
import { joinGroupMutationOptions } from '@/features/group/mutation';
import { GroupWithMembers } from '@/features/group/types';
import { useAxiosError } from '@/hooks/useAxiosError';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { JoinPrivateGroupFormSchema, formSchema } from './formSchema';

export default function JoinPrivateGroupForm({ group, onSubmit }: Props) {
  const { handleAxiosError } = useAxiosError();
  const { mutateAsync: joinGroup } = useMutation(joinGroupMutationOptions);
  const form = useForm<JoinPrivateGroupFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupId: group?.id,
      password: '',
    },
  });
  const { isSubmitting } = form.formState;

  const submitForm = form.handleSubmit(async (values: JoinPrivateGroupFormSchema) => {
    try {
      await joinGroup(values);
      onSubmit?.();
      form.reset();
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return (
    <Form {...form}>
      <form className="max-w-lg">
        <ScrollableDialogContent aria-describedby="">
          <DialogHeader>
            <DialogTitle>비공개 그룹 참여</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-4 my-4">
            <InputFormField
              className="flex-1"
              control={form.control}
              name="password"
              label="참여 코드"
              inputProps={{ autoFocus: true, type: 'password' }}
            />
          </div>

          <DialogFooter>
            <Button onClick={submitForm} isLoading={isSubmitting}>
              <span>참여하기</span>
            </Button>
          </DialogFooter>
        </ScrollableDialogContent>
      </form>
    </Form>
  );
}

type Props = {
  group?: GroupWithMembers;
  onSubmit?: () => void | Promise<void>;
};
