'use client';

import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import { Form, InputFormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { auctionCaseQueryKeys } from '@/features/auction-case/queryKey';
import { placeBidMutationOptions, updateBidMutationOptions } from '@/features/bid/mutation';
import { getBidDetailQueryOptions } from '@/features/bid/query';
import { useAxiosError } from '@/hooks/useAxiosError';
import { readNumberInKorean } from '@/lib/number';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient, useSuspenseQueries } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { BiddingFormSchema, formSchema } from './formSchema';
import BiddingFormSkeleton from './skeleton';
import { getDefaultFormValues } from './utils';

export default function BiddingForm({ auctionCaseId, bidId }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const [{ data: bid }, { data: auctionCase }] = useSuspenseQueries({
    queries: [getBidDetailQueryOptions(bidId), getAuctionCaseDetailQueryOptions(auctionCaseId)],
  });
  const { mutateAsync: placeBid } = useMutation(placeBidMutationOptions);
  const { mutateAsync: updateBid } = useMutation(updateBidMutationOptions);
  const queryClient = useQueryClient();
  const form = useForm<BiddingFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues({ auctionCaseId: auctionCaseId, bid }),
  });
  const { isSubmitting } = form.formState;

  const [
    isExcluded,
    expectedSalePrice,
    acquisitionCost,
    evacuationCost,
    repairCost,
    brokerageFee,
    estimatedInterest,
    otherCost,
    expectedProfit,
  ] = useWatch({
    control: form.control,
    name: [
      'isExcluded',
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

  if (!auctionCase) return <BiddingFormSkeleton />;

  const PREVIOUS_URL = `${PATHS.GROUP}/${auctionCase.groupId}${PATHS.AUCTION_CASE}/${auctionCase.id}`;

  const biddingPrice =
    expectedSalePrice -
    acquisitionCost -
    evacuationCost -
    repairCost -
    brokerageFee -
    estimatedInterest -
    otherCost -
    expectedProfit;

  const isEditing = !!bid;
  const formTitle = isEditing ? '입찰 정보 수정' : '입찰표 제출';

  const submitForm = form.handleSubmit(async (values: BiddingFormSchema) => {
    try {
      const mutationFn = isEditing ? updateBid : placeBid;
      await mutationFn({
        ...values,
        biddingPrice,
        excludedReason: values.isExcluded ? '모의 입찰' : '',
      });
      toast({
        title: auctionCase.caseName,
        description: <p>{formTitle} 성공</p>,
        variant: 'success',
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: auctionCaseQueryKeys.list(auctionCase.groupId) });
      router.replace(callbackUrl ? callbackUrl : PREVIOUS_URL);
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return (
    <Form {...form}>
      <form className="max-w-2xl lg:max-w-5xl mx-auto">
        <PageHeader
          className="lg:mx-[176px]"
          title={
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold">{formTitle}</span>
              <span className="text-sm font-semibold opacity-50">{auctionCase!.caseName}</span>
            </div>
          }
          backButton
        >
          <div className="h-[40px] flex items-center space-x-2 shrink-0">
            <Switch
              id="isExcluded"
              checked={isExcluded}
              onCheckedChange={(checked) => form.setValue('isExcluded', checked)}
            />
            <Label htmlFor="isExcluded">모의 입찰</Label>
          </div>
          <Button onClick={submitForm} isLoading={isSubmitting}>
            {isEditing ? '수정' : '제출'}
          </Button>
        </PageHeader>

        <PageBody className="flex flex-col gap-4 mb-8 lg:mx-[176px]">
          <InputFormField
            control={form.control}
            name="expectedSalePrice"
            label="목표 매도가"
            inputProps={{ autoFocus: true, format: 'thousandSeparator' }}
            suffix={readNumberInKorean(expectedSalePrice)}
          />

          <Divider>비용</Divider>
          <div className="flex flex-col gap-4">
            <InputFormField
              control={form.control}
              name="acquisitionCost"
              label="취득비용"
              inputProps={{ format: 'thousandSeparator' }}
              suffix={readNumberInKorean(acquisitionCost)}
            />
            <InputFormField
              control={form.control}
              name="evacuationCost"
              label="명도비 및 미납관리비"
              inputProps={{ format: 'thousandSeparator' }}
              suffix={readNumberInKorean(evacuationCost)}
            />
            <InputFormField
              control={form.control}
              name="repairCost"
              label="수리비"
              inputProps={{ format: 'thousandSeparator' }}
              suffix={readNumberInKorean(repairCost)}
            />
            <InputFormField
              control={form.control}
              name="brokerageFee"
              label="중개수수료"
              inputProps={{ format: 'thousandSeparator' }}
              suffix={readNumberInKorean(brokerageFee)}
            />
            <InputFormField
              control={form.control}
              name="estimatedInterest"
              label="이자비용"
              inputProps={{ format: 'thousandSeparator' }}
              suffix={readNumberInKorean(estimatedInterest)}
            />
            <InputFormField
              control={form.control}
              name="otherCost"
              label="기타비용"
              inputProps={{ format: 'thousandSeparator' }}
              suffix={readNumberInKorean(otherCost)}
            />
          </div>

          <Divider>수익</Divider>
          <div className="flex flex-col gap-4">
            <InputFormField
              control={form.control}
              name="expectedProfit"
              label="기대수익"
              inputProps={{ format: 'thousandSeparator' }}
              suffix={readNumberInKorean(expectedProfit)}
            />
          </div>

          <Divider>입찰가</Divider>
          <div className="flex items-center justify-between gap-4">
            <span className="text-lg font-bold">{biddingPrice.toLocaleString()}</span>
            <span className="text font-semibold text-primary/50">
              {readNumberInKorean(biddingPrice)}
            </span>
          </div>
        </PageBody>
      </form>
    </Form>
  );
}

type Props = {
  auctionCaseId: string;
  bidId?: string;
};
