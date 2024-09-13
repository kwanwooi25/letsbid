import { Button } from '@/components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, InputFormField } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { formSchema, GroupFormSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function GroupForm({ onSubmit }: Props) {
  const form = useForm<GroupFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues(),
  });
  const { isSubmitting } = form.formState;

  const isEditing = false;
  const formTitle = isEditing ? '그룹 수정' : '그룹 생성';

  const submitForm = form.handleSubmit(async (values: GroupFormSchema) => {
    console.log(values);

    try {
      // const method = isEditing ? 'patch' : 'post';
      // await axios<SuccessResponse<null>>({
      //   method,
      //   url: API_ROUTE.PURCHASE_ORDER,
      //   data: values,
      // });
      // toast({
      //   description: <p>{title} 성공</p>,
      //   variant: 'success',
      // });
      // router.refresh();
      onSubmit?.();
      // form.reset();
    } catch (error) {
      // handleAxiosError(error);
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
  onSubmit?: () => void;
};
