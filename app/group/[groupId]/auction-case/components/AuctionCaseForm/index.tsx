'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Form, InputFormField } from '@/components/ui/form';
import DateTimeFormField from '@/components/ui/form/DateTimeFormField';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import {
  createAuctionCaseMutationOptions,
  updateAuctionCaseMutationOptions,
} from '@/queries/auction-case/mutation';
import { getAuctionCaseDetailQueryOptions } from '@/queries/auction-case/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import AuctionCaseImageForm from './AuctionCaseImageForm';
import { AuctionCaseFormSchema, formSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function AuctionCaseForm({ groupId, auctionCaseId }: Props) {
  const router = useRouter();
  const callbackUrl = useCallbackUrl();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const { data: auctionCase } = useSuspenseQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));
  const createAuctionCaseMutation = useMutation(createAuctionCaseMutationOptions);
  const updateAuctionCaseMutation = useMutation(updateAuctionCaseMutationOptions);
  const form = useForm<AuctionCaseFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues({ groupId, auctionCase }),
  });
  const { isSubmitting } = form.formState;
  const [image, imageToUpload] = useWatch({
    control: form.control,
    name: ['image', 'imageToUpload'],
  });

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
    const { caseName } = await mutationFn(values);

    try {
      toast({
        title: caseName,
        description: <p>{formTitle} 성공</p>,
        variant: 'success',
      });
      form.reset();
      router.replace(callbackUrl ? callbackUrl : `${PATHS.GROUP}/${groupId}`, { scroll: false });
    } catch (error) {
      handleAxiosError(error);
    }
  });

  const handleImageChange: ComponentProps<typeof AuctionCaseImageForm>['onChange'] = ({
    imageFile,
  }) => {
    form.setValue('imageToUpload', imageFile);
    if (image) {
      form.setValue('imageToDelete', image);
    }
  };

  const handleImageRemove: ComponentProps<typeof AuctionCaseImageForm>['onRemove'] = () => {
    form.setValue('imageToUpload', undefined);
    if (image) {
      form.setValue('imageToDelete', image);
      form.setValue('image', undefined);
    }
  };

  return (
    <Form {...form}>
      <form className="max-w-xl mx-auto">
        <PageHeader title={formTitle} backButton>
          <Button onClick={submitForm} isLoading={isSubmitting}>
            <span>저장</span>
          </Button>
        </PageHeader>
        <PageBody className="flex flex-col gap-4">
          <InputFormField
            control={form.control}
            name="caseName"
            label="사건명"
            inputProps={{ placeholder: '2024타경12345', autoFocus: true }}
          />
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
          <DateTimeFormField
            control={form.control}
            name="actualBidStartsAt"
            label="실제 입찰 일시"
            hourCycle={24}
          />
          <InputFormField
            control={form.control}
            name="appraisedValue"
            label="감정가"
            inputProps={{ format: 'thousandSeparator' }}
          />
          <InputFormField
            control={form.control}
            name="startingBid"
            label="최저가"
            inputProps={{ format: 'thousandSeparator' }}
          />
          <AuctionCaseImageForm
            imageFile={imageToUpload}
            imageUrl={image}
            onChange={handleImageChange}
            onRemove={handleImageRemove}
          />
        </PageBody>
      </form>
    </Form>
  );
}

type Props = {
  groupId: string;
  auctionCaseId?: string;
};
