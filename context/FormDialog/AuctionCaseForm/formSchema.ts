import { isAfter } from 'date-fns';
import { z } from 'zod';

export const formSchema = z
  .object({
    id: z.string().optional(),
    caseName: z.string().min(1, { message: '사건명 입력해주세요' }),
    bidStartsAt: z.date({ message: '입찰 시작 일시를 입력해주세요' }),
    bidEndsAt: z.date({ message: '입찰 종료 일시를 입력해주세요' }),
    groupId: z.string().optional(),
  })
  .refine((data) => isAfter(data.bidEndsAt, data.bidStartsAt), {
    message: '입찰 종료 일시가 입찰 시작 일시보다 늦어야 합니다',
    path: ['bidEndsAt'],
  });

export type AuctionCaseFormSchema = z.infer<typeof formSchema>;
