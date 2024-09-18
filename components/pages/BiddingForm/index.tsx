'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useAxiosError } from '@/hooks/useAxiosError';
import { getAuctionCaseName } from '@/lib/auctionCase';
import { getAuctionCaseDetailQueryOptions } from '@/queries/auction-case/query';
import { placeBidMutationOptions, updateBidMutationOptions } from '@/queries/bid/mutation';
import { getBidDetailQueryOptions } from '@/queries/bid/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { BiddingFormSchema, formSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function BiddingForm({ auctionCaseId, bidId, onSubmit }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const { data: auctionCase } = useSuspenseQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));
  const { data: bid } = useSuspenseQuery(getBidDetailQueryOptions(bidId));
  const placeBidMutation = useMutation(placeBidMutationOptions);
  const updateBidMutation = useMutation(updateBidMutationOptions);
  const form = useForm<BiddingFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues({ auctionCaseId, bid }),
  });
  const { isSubmitting } = form.formState;

  const watchedValues = useWatch({
    control: form.control,
    name: [
      'expectedSalePrice',
      'acquisitionCost',
      'evacuationCost',
      'repairCost',
      'brokerageFee',
      'estimatedInterest',
      'otherCost',
      'expectedProfit',
    ],
  });

  useEffect(() => {
    const [
      expectedSalePrice,
      acquisitionCost,
      evacuationCost,
      repairCost,
      brokerageFee,
      estimatedInterest,
      otherCost,
      expectedProfit,
    ] = watchedValues;
    const biddingPrice =
      expectedSalePrice -
      acquisitionCost -
      evacuationCost -
      repairCost -
      brokerageFee -
      estimatedInterest -
      otherCost -
      expectedProfit;
    form.setValue('biddingPrice', biddingPrice);
  }, [watchedValues]);

  const isEditing = !!bid;
  const formTitle = isEditing ? '입찰 정보 수정' : '입찰표 제출';
  const auctionCaseName = getAuctionCaseName(auctionCase);

  const placeBid = async (values: BiddingFormSchema) => {
    const placedBid = await placeBidMutation.mutateAsync(values);
    return placedBid;
  };
  const updateBid = async (values: BiddingFormSchema) => {
    const updatedBid = await updateBidMutation.mutateAsync(values);
    return updatedBid;
  };

  const submitForm = form.handleSubmit(async (values: BiddingFormSchema) => {
    try {
      const mutationFn = isEditing ? updateBid : placeBid;
      await mutationFn(values);
      toast({
        title: auctionCaseName,
        description: <p>{formTitle} 성공</p>,
        variant: 'success',
      });
      onSubmit?.();
      form.reset();
      router.replace(
        callbackUrl
          ? callbackUrl
          : `${PATHS.GROUP}/${auctionCase.groupId}${PATHS.AUCTION_CASE}/${auctionCase.id}`,
      );
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return (
    <Form {...form}>
      <form className="max-w-lg mx-auto">
        <PageHeader
          title={
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold">{formTitle}</span>
              <span className="text-sm font-semibold opacity-50">{auctionCaseName}</span>
            </div>
          }
          backButton
        >
          <Button onClick={submitForm} isLoading={isSubmitting}>
            <span>{isEditing ? '수정' : '제출'}</span>
          </Button>
        </PageHeader>

        <PageBody className="flex flex-col gap-4 mb-8">
          <InputFormField
            control={form.control}
            name="expectedSalePrice"
            label="목표 매도가"
            inputProps={{ autoFocus: true, format: 'thousandSeparator' }}
          />

          <Divider>비용</Divider>
          <div className="flex flex-col gap-4">
            <InputFormField
              control={form.control}
              name="acquisitionCost"
              label="취득비용"
              inputProps={{ format: 'thousandSeparator' }}
            />
            <InputFormField
              control={form.control}
              name="evacuationCost"
              label="명도비 및 미납관리비"
              inputProps={{ format: 'thousandSeparator' }}
            />
            <InputFormField
              control={form.control}
              name="repairCost"
              label="수리비"
              inputProps={{ format: 'thousandSeparator' }}
            />
            <InputFormField
              control={form.control}
              name="brokerageFee"
              label="중개수수료"
              inputProps={{ format: 'thousandSeparator' }}
            />
            <InputFormField
              control={form.control}
              name="estimatedInterest"
              label="이자비용"
              inputProps={{ format: 'thousandSeparator' }}
            />
            <InputFormField
              control={form.control}
              name="otherCost"
              label="기타비용"
              inputProps={{ format: 'thousandSeparator' }}
            />
          </div>

          <Divider>수익</Divider>
          <div className="flex flex-col gap-4">
            <InputFormField
              control={form.control}
              name="expectedProfit"
              label="기대수익"
              inputProps={{ format: 'thousandSeparator' }}
            />
          </div>

          <Divider>입찰가</Divider>
          <div className="flex flex-col gap-4">
            <InputFormField
              control={form.control}
              name="biddingPrice"
              label="입찰가"
              inputProps={{ format: 'thousandSeparator' }}
            />
          </div>
        </PageBody>
      </form>
    </Form>
  );
}

type Props = {
  auctionCaseId: string;
  bidId?: string;
  onSubmit?: () => void | Promise<void>;
};
