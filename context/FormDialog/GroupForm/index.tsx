import { Button } from '@/components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useAxiosError } from '@/hooks/useAxiosError';
import { createGroupMutationOptions } from '@/queries/group/mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { formSchema, GroupFormSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function GroupForm({ onSubmit }: Props) {
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const createGroupMutation = useMutation(createGroupMutationOptions);
  const form = useForm<GroupFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues(),
  });
  const { isSubmitting } = form.formState;

  const isEditing = false;
  const formTitle = isEditing ? '그룹 수정' : '그룹 생성';

  const createGroup = async (values: GroupFormSchema) => {
    const createdGroup = await createGroupMutation.mutateAsync(values);
    toast({
      title: createdGroup.name,
      description: <p>{formTitle} 성공</p>,
      variant: 'success',
    });
  };

  const submitForm = form.handleSubmit(async (values: GroupFormSchema) => {
    try {
      if (!isEditing) await createGroup(values);
      onSubmit?.();
      form.reset();
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return (
    <Form {...form}>
      <form className="max-w-xl">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formTitle}</DialogTitle>
          </DialogHeader>

          <div>
            <InputFormField
              control={form.control}
              name="name"
              label="그룹명"
              inputProps={{ autoFocus: true }}
            />
          </div>

          <DialogFooter>
            <Button onClick={submitForm} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className={'mr-2 h-4 w-4 animate-spin'} />}
              <span>저장</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Form>
  );
}

type Props = {
  onSubmit?: () => void | Promise<void>;
};
