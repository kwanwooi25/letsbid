import { AuctionCaseStatus } from '@/types/auctionCase';

export const AUCTION_CASE_STATUS_TRANSLATIONS: Record<AuctionCaseStatus, string> = {
  BEFORE_BIDDING: '입찰 예정',
  BIDDING: '입찰 중',
  FINISHED_BIDDING: '입찰 종료',
};

export const AUCTION_CASE_STATUS_LIST: AuctionCaseStatus[] = [
  'BIDDING',
  'BEFORE_BIDDING',
  'FINISHED_BIDDING',
];
