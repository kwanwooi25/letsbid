import { z } from 'zod';

export const formSchema = z.object({
  id: z.string().optional(),
  expectedSalePrice: z.coerce.number().int().default(0),
  acquisitionCost: z.coerce.number().int().default(0),
  evacuationCost: z.coerce.number().int().default(0),
  repairCost: z.coerce.number().int().default(0),
  brokerageFee: z.coerce.number().int().default(0),
  estimatedInterest: z.coerce.number().int().default(0),
  otherCost: z.coerce.number().int().default(0),
  expectedProfit: z.coerce.number().int().default(0),
  biddingPrice: z.coerce.number().int().default(0),
  isExcluded: z.boolean().default(false),
  excludedReason: z.string().optional(),
  auctionCaseId: z.string().optional(),
});

export type BiddingFormSchema = z.infer<typeof formSchema>;
