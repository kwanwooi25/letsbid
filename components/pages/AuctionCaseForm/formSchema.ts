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
    actualBidStartsAt: z.date().optional(),
    appraisedValue: z.coerce.number().int().default(0),
    startingBid: z.coerce.number().int().default(0),
    officialValue: z.coerce.number().int().default(0),
    area: z.coerce.number().optional().nullable(),
    floorLevel: z.coerce.number().int().optional().nullable(),
    floorPlan: z.string().optional().nullable(),
    hasElevator: z.boolean().default(false),
    completedYear: z.coerce.number().int().optional().nullable(),
    images: z.array(z.string().url()),
    imagesToUpload: z.array(
      z
        .any()
        .refine((file) => !file || file?.type.includes('image'), '이미지 파일만 업로드 가능합니다'),
    ),
    imagesToDelete: z.array(z.string()),
    groupId: z.string().optional(),
  })
  .refine((data) => isAfter(data.bidEndsAt, data.bidStartsAt), {
    message: '입찰 종료 일시가 입찰 시작 일시보다 늦어야 합니다',
    path: ['bidEndsAt'],
  });

export type AuctionCaseFormSchema = z.infer<typeof formSchema>;
