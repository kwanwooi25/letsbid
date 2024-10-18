'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Form, InputFormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { createGroupMutationOptions, updateGroupMutationOptions } from '@/queries/group/mutation';
import { getGroupDetailQueryOptions } from '@/queries/group/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { LucideEye, LucideEyeOff } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
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
  const [isPrivate] = useWatch({ control: form.control, name: ['isPrivate'] });
  const [showPassword, setShowPassword] = useState(false);

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
      router.replace(callbackUrl ? callbackUrl : PATHS.GROUP, { scroll: false });
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

        <PageBody className="flex flex-col gap-4">
          <InputFormField
            control={form.control}
            name="name"
            label="그룹명"
            inputProps={{ autoFocus: true }}
          />
          <InputFormField control={form.control} name="description" label="한줄 소개" />
          <InputFormField
            control={form.control}
            name="maxMembers"
            label="최대인원"
            inputProps={{ format: 'thousandSeparator', max: 1000 }}
          />
          <div className="flex gap-4 items-start mt-7">
            <div className="h-[40px] flex items-center space-x-2 shrink-0">
              <Switch
                id="isPrivate"
                checked={isPrivate}
                onCheckedChange={(checked) => form.setValue('isPrivate', checked)}
              />
              <Label htmlFor="isPrivate">비공개</Label>
            </div>
            {isPrivate && (
              <div className="flex-1 flex items-start gap-2">
                <InputFormField
                  className="flex-1"
                  control={form.control}
                  name="password"
                  inputProps={{
                    type: showPassword ? 'text' : 'password',
                    placeholder: isEditing ? '변경할 비밀번호 입력' : '비밀번호 입력',
                  }}
                />
                <Button
                  onClick={() => setShowPassword((v) => !v)}
                  variant="ghost"
                  size="icon"
                  type="button"
                >
                  {showPassword ? <LucideEyeOff /> : <LucideEye />}
                </Button>
              </div>
            )}
          </div>
        </PageBody>
      </form>
    </Form>
  );
}
