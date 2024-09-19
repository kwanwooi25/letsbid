import { Button } from '@/components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, InputFormField } from '@/components/ui/form';
import DateTimeFormField from '@/components/ui/form/DateTimeFormField';
import { useToast } from '@/components/ui/use-toast';
import { useAxiosError } from '@/hooks/useAxiosError';
import {
  createAuctionCaseMutationOptions,
  updateAuctionCaseMutationOptions,
} from '@/queries/auction-case/mutation';
import { AuctionCaseLike } from '@/types/auctionCase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { AuctionCaseFormSchema, formSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function AuctionCaseForm({ groupId, auctionCase, onSubmit }: Props) {
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const createAuctionCaseMutation = useMutation(createAuctionCaseMutationOptions);
  const updateAuctionCaseMutation = useMutation(updateAuctionCaseMutationOptions);
  const form = useForm<AuctionCaseFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues({ groupId, auctionCase }),
  });
  const { isSubmitting } = form.formState;

  const isEditing = !!auctionCase;
  const formTitle = isEditing ? '경매 사건 수정' : '경매 사건 추가';

  const createAuctionCase = async (values: AuctionCaseFormSchema) => {
    const createdAuctionCase = await createAuctionCaseMutation.mutateAsync(values);
    return createdAuctionCase;
  };
  const updateAuctionCase = async (values: AuctionCaseFormSchema) => {
    const updatedAuctionCase = await updateAuctionCaseMutation.mutateAsync(values);
    return updatedAuctionCase;
  };

  const submitForm = form.handleSubmit(async (values: AuctionCaseFormSchema) => {
    values.bidStartsAt.setSeconds(0);
    values.bidEndsAt.setSeconds(0);
    const mutationFn = isEditing ? updateAuctionCase : createAuctionCase;
    const { caseYear, caseNumber } = await mutationFn(values);

    try {
      toast({
        title: `${caseYear}타경${caseNumber}`,
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

          <div className="flex flex-col gap-4 my-4">
            <div className="flex items-center gap-2">
              <InputFormField
                control={form.control}
                name="caseYear"
                inputProps={{ autoFocus: true, placeholder: '2024' }}
              />
              <span className="shrink-0">타경</span>
              <InputFormField
                control={form.control}
                name="caseNumber"
                inputProps={{ placeholder: '12345' }}
              />
            </div>
            <DateTimeFormField
              control={form.control}
              name="bidStartsAt"
              label="입찰 시작 일시"
              hourCycle={24}
            />
            <DateTimeFormField
              control={form.control}
              name="bidEndsAt"
              label="입찰 종료 일시"
              hourCycle={24}
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
  groupId?: string;
  auctionCase?: AuctionCaseLike;
  onSubmit?: () => void | Promise<void>;
};
