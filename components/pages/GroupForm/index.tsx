'use client';

import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { Button } from '@/components/ui/button';
import { Form, InputFormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { createGroupMutationOptions, updateGroupMutationOptions } from '@/features/group/mutation';
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { LucideEye, LucideEyeOff } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { formSchema, GroupFormSchema } from './formSchema';
import UserRolesSelect from './UserRolesSelect';
import { getDefaultFormValues } from './utils';

export default function GroupForm() {
  const params = useParams();
  const groupId = params.groupId as string;
  const router = useRouter();
  const callbackUrl = useCallbackUrl();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const { data: group } = useSuspenseQuery(getGroupDetailQueryOptions(groupId));
  const { mutateAsync: createGroup } = useMutation(createGroupMutationOptions);
  const { mutateAsync: updateGroup } = useMutation(updateGroupMutationOptions);
  const form = useForm<GroupFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues(group),
  });
  const { isSubmitting } = form.formState;
  const [isPrivate] = useWatch({ control: form.control, name: ['isPrivate'] });
  const [showPassword, setShowPassword] = useState(false);

  const isEditing = !!group;
  const formTitle = isEditing ? '그룹 수정' : '그룹 생성';

  const submitForm = form.handleSubmit(async (values: GroupFormSchema) => {
    try {
      const mutationFn = isEditing ? updateGroup : createGroup;
      const { name } = await mutationFn(values);
      toast({
        title: name,
        description: <p>{formTitle} 성공</p>,
        variant: 'success',
      });
      form.reset();
      router.replace(callbackUrl ? callbackUrl : PATHS.GROUP);
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return (
    <Form {...form}>
      <form className="max-w-2xl lg:max-w-5xl mx-auto">
        <PageHeader className="lg:mx-[176px]" title={formTitle} backButton>
          <Button onClick={submitForm} isLoading={isSubmitting}>
            <span>저장</span>
          </Button>
        </PageHeader>

        <PageBody className="flex flex-col gap-4 lg:mx-[176px]">
          <InputFormField
            control={form.control}
            name="name"
            label="그룹명"
            inputProps={{ autoFocus: true }}
          />
          <InputFormField control={form.control} name="description" label="한줄 소개" />
          <div className="w-full flex gap-4">
            <InputFormField
              className="w-full"
              control={form.control}
              name="maxMembers"
              label="최대인원"
              inputProps={{ format: 'thousandSeparator', max: 1000 }}
            />

            <UserRolesSelect
              className="w-full"
              label="최소 회원 등급"
              placeholder="최소 회원 등급 선택"
              name="userRoles"
            />
          </div>
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
