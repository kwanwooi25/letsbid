import { Button } from '@/components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useAxiosError } from '@/hooks/useAxiosError';
import { createGroupMutationOptions, updateGroupMutationOptions } from '@/queries/group/mutation';
import { GroupWithMembers } from '@/types/group';
import { zodResolver } from '@hookform/resolvers/zod';
import { Group } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { formSchema, GroupFormSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function GroupForm({ group, onSubmit }: Props) {
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const createGroupMutation = useMutation(createGroupMutationOptions);
  const updateGroupMutation = useMutation(updateGroupMutationOptions);
  const form = useForm<GroupFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues(group),
  });
  const { isSubmitting } = form.formState;

  const isEditing = !!group;
  const formTitle = isEditing ? '그룹 수정' : '그룹 생성';

  const createGroup = async (values: GroupFormSchema) => {
    const createdGroup = await createGroupMutation.mutateAsync(values);
    return createdGroup.name;
  };

  const editGroup = async (values: GroupFormSchema) => {
    const updatedGroup = await updateGroupMutation.mutateAsync(values);
    return updatedGroup.name;
  };

  const submitForm = form.handleSubmit(async (values: GroupFormSchema) => {
    try {
      const mutationFn = isEditing ? editGroup : createGroup;
      const groupName = await mutationFn(values);
      toast({
        title: groupName,
        description: <p>{formTitle} 성공</p>,
        variant: 'success',
      });
      onSubmit?.();
      form.reset();
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return (
    <Form {...form}>
      <form className="max-w-xl">
        <DialogContent aria-describedby="">
          <DialogHeader>
            <DialogTitle>{formTitle}</DialogTitle>
          </DialogHeader>

          <div className="my-4">
            <InputFormField
              control={form.control}
              name="name"
              label="그룹명"
              inputProps={{ autoFocus: true }}
            />
          </div>

          <DialogFooter>
            <Button onClick={submitForm} isLoading={isSubmitting}>
              <span>저장</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Form>
  );
}

type Props = {
  group?: Group | GroupWithMembers;
  onSubmit?: () => void | Promise<void>;
};
