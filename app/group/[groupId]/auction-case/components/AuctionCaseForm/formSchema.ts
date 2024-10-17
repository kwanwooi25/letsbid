import { isAfter } from 'date-fns';
import { z } from 'zod';

export const formSchema = z
  .object({
    id: z.string().optional(),
    caseName: z.string().min(1, { message: '사건명 입력해주세요' }),
    address: z.string().optional(),
    addressDetail: z.string().optional(),
    bidStartsAt: z.date({ message: '입찰 시작 일시를 입력해주세요' }),
    bidEndsAt: z.date({ message: '입찰 종료 일시를 입력해주세요' }),
    actualBidStartsAt: z.date({ message: '실제 입찰 일시를 입력해주세요' }),
    appraisedValue: z.coerce.number().int().default(0),
    startingBid: z.coerce.number().int().default(0),
    image: z.string().optional(),
    imageToUpload: z
      .any()
      .refine((file) => !file || file?.type.includes('image'), '이미지 파일만 업로드 가능합니다')
      .optional(),
    imageToDelete: z.string().optional(),
    groupId: z.string().optional(),
  })
  .refine((data) => isAfter(data.bidEndsAt, data.bidStartsAt), {
    message: '입찰 종료 일시가 입찰 시작 일시보다 늦어야 합니다',
    path: ['bidEndsAt'],
  });

export type AuctionCaseFormSchema = z.infer<typeof formSchema>;
