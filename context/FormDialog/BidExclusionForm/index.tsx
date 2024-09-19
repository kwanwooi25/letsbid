import { Button } from '@/components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckboxFormField, Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useAxiosError } from '@/hooks/useAxiosError';
import { updateBidMutationOptions } from '@/queries/bid/mutation';
import { BidWithUser } from '@/types/bid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { BidExclusionFormSchema, formSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function BidExclusionForm({ bid, onSubmit }: Props) {
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const updateBidMutation = useMutation(updateBidMutationOptions);
  const form = useForm<BidExclusionFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues(bid),
  });
  const { isSubmitting } = form.formState;

  const submitForm = form.handleSubmit(async (values: BidExclusionFormSchema) => {
    try {
      const updatedBid = await updateBidMutation.mutateAsync({
        ...values,
        excludedReason: values.isExcluded ? values.excludedReason : '',
      });
      const result = updatedBid.isExcluded ? '입찰 제외' : '입찰 참여';
      toast({
        title: updatedBid.user.name,
        description: <p>{result} 성공</p>,
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>입찰 참여/제외</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-4 my-4">
            <CheckboxFormField control={form.control} name="isExcluded" label="입찰 제외" />
            <InputFormField
              className="flex-1"
              control={form.control}
              name="excludedReason"
              inputProps={{ autoFocus: true, placeholder: '제외 사유 입력' }}
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
  bid?: BidWithUser;
  onSubmit?: () => void | Promise<void>;
};
