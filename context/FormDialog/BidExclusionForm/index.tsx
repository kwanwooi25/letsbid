import { Button } from '@/components/ui/button';
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  ScrollableDialogContent,
} from '@/components/ui/dialog';
import { Form, InputFormField } from '@/components/ui/form';
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
  const { mutateAsync: updateBid } = useMutation(updateBidMutationOptions);
  const form = useForm<BidExclusionFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues(bid),
  });
  const { isSubmitting } = form.formState;
  const dialogTitle = bid?.isExcluded ? '입찰 참여 처리' : '입찰 제외 처리';

  const submitForm = form.handleSubmit(async (values: BidExclusionFormSchema) => {
    try {
      const updatedBid = await updateBid(values);
      toast({
        title: updatedBid.user.name,
        description: '입찰 제외 처리되었습니다',
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
        <ScrollableDialogContent aria-describedby="">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-4 my-4">
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
        </ScrollableDialogContent>
      </form>
    </Form>
  );
}

type Props = {
  bid?: BidWithUser;
  onSubmit?: () => void | Promise<void>;
};
