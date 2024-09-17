import { ListItemColor } from '@/components/ListItem/types';
import { AuctionCaseStatus } from '@/types/auctionCase';
import { AuctionCase } from '@prisma/client';
import { differenceInSeconds, format, isAfter } from 'date-fns';
import { formatSeconds, ONE_DAY, ONE_HOUR } from './time';

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

export function getRemainingTimeDisplay(auctionCase: AuctionCase) {
  const { bidStartsAt, bidEndsAt } = auctionCase;
  const status = getAuctionCaseStatus(auctionCase);
  const criteriaDateTime = status === 'BEFORE_BIDDING' ? bidStartsAt : bidEndsAt;
  const totalSeconds = differenceInSeconds(criteriaDateTime, new Date());
  return formatSeconds(totalSeconds);
}

export function getAuctionCaseColor(auctionCase: AuctionCase): ListItemColor {
  const { bidStartsAt, bidEndsAt } = auctionCase;
  const status = getAuctionCaseStatus(auctionCase);
  const criteriaDateTime = status === 'BEFORE_BIDDING' ? bidStartsAt : bidEndsAt;
  const totalSeconds = differenceInSeconds(criteriaDateTime, new Date());

  if (totalSeconds > ONE_DAY) return 'green';
  if (totalSeconds > ONE_HOUR) return 'yellow';
  if (totalSeconds < 0) return 'gray';
  return 'red';
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
