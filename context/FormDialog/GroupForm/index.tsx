import { Button } from '@/components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { API_ROUTE } from '@/const/paths';
import { useAxiosError } from '@/hooks/useAxiosError';
import { SuccessResponse } from '@/types/api';
import { GroupWithMembers } from '@/types/group';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { formSchema, GroupFormSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function GroupForm({ onSubmit }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const { handleAxiosError } = useAxiosError();
  const form = useForm<GroupFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues(),
  });
  const { isSubmitting } = form.formState;

  const isEditing = false;
  const formTitle = isEditing ? '그룹 수정' : '그룹 생성';

  const submitForm = form.handleSubmit(async (values: GroupFormSchema) => {
    try {
      const method = isEditing ? 'patch' : 'post';
      const createdGroup = await axios<SuccessResponse<GroupWithMembers>>({
        method,
        url: API_ROUTE.CREATE_GROUP,
        data: values,
      });
      console.log(createdGroup);
      toast({
        description: <p>{formTitle} 성공</p>,
        variant: 'success',
      });
      router.refresh();
      onSubmit?.();
      form.reset();
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return (
    <Form {...form}>
      <form>
        <DialogContent className="max-w-xl">
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
