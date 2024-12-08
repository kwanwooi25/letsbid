'use client';

import PageBody from '@/components/layouts/PageBody';
import PageHeader from '@/components/layouts/PageHeader';
import { Button } from '@/components/ui/button';
import { CheckboxFormField, Form, InputFormField } from '@/components/ui/form';
import DateTimeFormField from '@/components/ui/form/DateTimeFormField';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import {
  createAuctionCaseMutationOptions,
  updateAuctionCaseMutationOptions,
} from '@/features/auction-case/mutation';
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCallbackUrl } from '@/hooks/useCallbackUrl';
import { squareMeterToPY } from '@/lib/number';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import uniq from 'lodash/uniq';
import uniqWith from 'lodash/uniqWith';
import { LucideX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ComponentProps, FocusEventHandler } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useForm, useWatch } from 'react-hook-form';
import AuctionCaseImage from './AuctionCaseImage';
import AuctionCaseImageForm from './AuctionCaseImageForm';
import { AuctionCaseFormSchema, formSchema } from './formSchema';
import { getDefaultFormValues } from './utils';

export default function AuctionCaseForm({ groupId, auctionCaseId }: Props) {
  const router = useRouter();
  const callbackUrl = useCallbackUrl();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const { data: auctionCase } = useSuspenseQuery(getAuctionCaseDetailQueryOptions(auctionCaseId));
  const { mutateAsync: createAuctionCase } = useMutation(createAuctionCaseMutationOptions);
  const { mutateAsync: updateAuctionCase } = useMutation(updateAuctionCaseMutationOptions);
  const form = useForm<AuctionCaseFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultFormValues({ groupId, auctionCase }),
  });
  const { isSubmitting } = form.formState;
  const [images, imagesToUpload, imagesToDelete, area, address] = useWatch({
    control: form.control,
    name: ['images', 'imagesToUpload', 'imagesToDelete', 'area', 'address'],
  });
  const openDaumPostcode = useDaumPostcodePopup();

  const areaInPY = (() => {
    if (!area) return null;
    return `${squareMeterToPY(area)}평`;
  })();

  const isEditing = !!auctionCase;
  const formTitle = isEditing ? '경매 사건 수정' : '경매 사건 추가';

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
      router.replace(callbackUrl ? callbackUrl : `${PATHS.GROUP}/${groupId}`);
    } catch (error) {
      handleAxiosError(error);
    }
  });

  const handleImageDrop: ComponentProps<typeof AuctionCaseImageForm>['onDrop'] = (imageFiles) => {
    const newImagesToUpload = uniqWith(
      [...imagesToUpload, ...imageFiles],
      (a: File, b: File) =>
        a.webkitRelativePath === b.webkitRelativePath &&
        a.name === b.name &&
        a.size === b.size &&
        a.lastModified === b.lastModified,
    );
    form.setValue('imagesToUpload', newImagesToUpload);
  };

  const handleImageRemove = (imageUrl: string) => () => {
    const newImages = images.filter((img) => img !== imageUrl);
    const newImagesToDelete = uniq([...imagesToDelete, imageUrl]);
    form.setValue('images', newImages);
    form.setValue('imagesToDelete', newImagesToDelete);
  };

  const handleImageFileRemove = (imageFile: File) => () => {
    const newImagesToUpload = uniq(imagesToUpload.filter((img) => img !== imageFile));
    form.setValue('imagesToUpload', newImagesToUpload);
  };

  const handleFocusAddressInput: FocusEventHandler<HTMLInputElement> = (e) => {
    e.currentTarget.blur();
    openDaumPostcode({
      onComplete(data) {
        let address = `${data.roadAddress} (${data.jibunAddress
          .replace(data.sido, '')
          .replace(data.sigungu, '')
          .trim()})`;
        if (data.buildingName) {
          address = address.replace(')', `, ${data.buildingName})`);
        }
        form.setValue('address', address);
        form.setFocus('addressDetail');
      },
    });
  };

  const removeAddress = () => {
    form.setValue('address', '');
    form.setValue('addressDetail', '');
  };

  return (
    <Form {...form}>
      <form className="max-w-2xl lg:max-w-5xl mx-auto">
        <PageHeader className="lg:mx-[176px]" title={formTitle} backButton>
          <Button onClick={submitForm} isLoading={isSubmitting}>
            <span>저장</span>
          </Button>
        </PageHeader>
        <PageBody className="flex flex-col gap-4 md:gap-6 lg:mx-[176px]">
          <InputFormField
            control={form.control}
            name="caseName"
            label="사건명"
            inputProps={{ placeholder: '2024타경12345', autoFocus: true }}
            required
          />
          <InputFormField
            control={form.control}
            name="address"
            label="주소"
            inputProps={{ onFocus: handleFocusAddressInput, readOnly: true }}
            suffix={
              !!address ? (
                <Button
                  className="mr-[-12px]"
                  onClick={removeAddress}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <LucideX />
                </Button>
              ) : null
            }
          />
          <InputFormField
            className="md:flex-1"
            control={form.control}
            name="addressDetail"
            label="상세 주소"
          />
          <div className="flex flex-col gap-4 md:flex-row">
            <DateTimeFormField
              className="md:flex-1"
              control={form.control}
              name="bidStartsAt"
              label="입찰 시작 일시"
              hourCycle={24}
              required
            />
            <DateTimeFormField
              className="md:flex-1"
              control={form.control}
              name="bidEndsAt"
              label="입찰 종료 일시"
              hourCycle={24}
              required
            />
            <DateTimeFormField
              className="md:flex-1"
              control={form.control}
              name="actualBidStartsAt"
              label="실제 입찰 일시"
              hourCycle={24}
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <InputFormField
              className="md:flex-1"
              control={form.control}
              name="appraisedValue"
              label="감정가"
              inputProps={{ format: 'thousandSeparator' }}
            />
            <InputFormField
              className="md:flex-1"
              control={form.control}
              name="startingBid"
              label="최저가"
              inputProps={{ format: 'thousandSeparator' }}
            />
            <InputFormField
              className="md:flex-1"
              control={form.control}
              name="officialValue"
              label="공시가"
              inputProps={{ format: 'thousandSeparator' }}
            />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <InputFormField
              className="md:flex-1"
              control={form.control}
              name="area"
              label="면적 (㎡)"
              inputProps={{ format: 'numberOnly' }}
              suffix={areaInPY}
            />
            <InputFormField
              className="md:flex-1"
              control={form.control}
              name="floorLevel"
              label="층"
              inputProps={{ format: 'numberOnly' }}
            />
            <InputFormField
              className="md:flex-1"
              control={form.control}
              name="completedYear"
              label="준공연도"
              inputProps={{ format: 'numberOnly' }}
            />
          </div>
          <div className="flex items-end gap-4">
            <InputFormField
              className="flex-1"
              control={form.control}
              name="floorPlan"
              label="구조"
              inputProps={{ placeholder: '방3 화2' }}
            />
            <CheckboxFormField
              className="min-h-[40px]"
              control={form.control}
              name="hasElevator"
              label="엘리베이터"
            />
          </div>

          <AuctionCaseImageForm className="mt-8" onDrop={handleImageDrop} />

          <div className="mb-8 grid grid-cols-4 gap-3 flex-wrap">
            {images.map((imageUrl) => (
              <AuctionCaseImage
                key={imageUrl}
                imageUrl={imageUrl}
                onRemove={handleImageRemove(imageUrl)}
              />
            ))}
            {imagesToUpload.map((imageFile: File, index: number) => (
              <AuctionCaseImage
                key={`${imageFile.name}_${index}`}
                imageFile={imageFile}
                onRemove={handleImageFileRemove(imageFile)}
              />
            ))}
          </div>
        </PageBody>
      </form>
    </Form>
  );
}

type Props = {
  groupId: string;
  auctionCaseId?: string;
};
