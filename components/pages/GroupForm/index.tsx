'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { createGroupMutationOptions, updateGroupMutationOptions } from '@/queries/group/mutation';
import { getGroupDetailQueryOptions } from '@/queries/group/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { formSchema, GroupFormSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function GroupForm() {
  const params = useParams();
  const groupId = params.groupId as string;
  const router = useRouter();
  const callbackUrl = useCallbackUrl();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const { data: group } = useSuspenseQuery(getGroupDetailQueryOptions(groupId));
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
      form.reset();
      router.replace(callbackUrl ? callbackUrl : PATHS.HOME, { scroll: false });
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return (
    <Form {...form}>
      <form className="max-w-lg mx-auto">
        <PageHeader title={formTitle} backButton>
          <Button onClick={submitForm} isLoading={isSubmitting}>
            <span>저장</span>
          </Button>
        </PageHeader>

        <PageBody>
          <InputFormField
            control={form.control}
            name="name"
            label="그룹명"
            inputProps={{ autoFocus: true }}
          />
        </PageBody>
      </form>
    </Form>
  );
}
