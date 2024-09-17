import { AuctionCaseStatus } from '@/types/auctionCase';
import { AuctionCase } from '@prisma/client';
import { format, isAfter } from 'date-fns';

export function getAuctionCaseName(auctionCase: AuctionCase) {
  const { caseYear, caseNumber } = auctionCase;
  return `${caseYear}타경${caseNumber}`;
}

export function getAuctionCaseStatus(auctionCase: AuctionCase): AuctionCaseStatus {
  const { bidStartsAt, bidEndsAt } = auctionCase;
  const now = new Date();

  if (isAfter(bidStartsAt, now)) return 'BEFORE_BIDDING';
  if (isAfter(bidEndsAt, now)) return 'BIDDING';
  return 'FINISHED_BIDDING';
}

export function getAuctionCaseTimeRefDisplay(auctionCase: AuctionCase) {
  const { bidStartsAt, bidEndsAt } = auctionCase;
  const status = getAuctionCaseStatus(auctionCase);

  switch (status) {
    case 'BEFORE_BIDDING':
      return `입찰 시작: ${format(bidStartsAt, 'yyyy/MM/dd HH:mm')}`;
    case 'BIDDING':
    case 'FINISHED_BIDDING':
    default:
      return `입찰 종료: ${format(bidEndsAt, 'yyyy/MM/dd HH:mm')}`;
  }
}

export function categorizeAuctionCases(
  auctionCases: AuctionCase[],
): Record<AuctionCaseStatus, AuctionCase[]> {
  return auctionCases.reduce(
    (acc, cur) => {
      const status = getAuctionCaseStatus(cur);
      acc[status].push(cur);
      return acc;
    },
    {
      BIDDING: [] as AuctionCase[],
      BEFORE_BIDDING: [] as AuctionCase[],
      FINISHED_BIDDING: [] as AuctionCase[],
    },
  );
}
