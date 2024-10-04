import { ListItemColor } from '@/components/ListItem/types';
import { AuctionCaseLike, AuctionCaseStatus } from '@/types/auctionCase';
import { differenceInSeconds, format, isAfter } from 'date-fns';
import { formatSeconds, ONE_DAY, ONE_HOUR } from './time';

export function getAuctionCaseStatus(auctionCase: AuctionCaseLike): AuctionCaseStatus {
  const { bidStartsAt, bidEndsAt } = auctionCase;
  const now = new Date();

  if (isAfter(bidStartsAt, now)) return 'BEFORE_BIDDING';
  if (isAfter(bidEndsAt, now)) return 'BIDDING';
  return 'FINISHED_BIDDING';
}

export function getAuctionCaseTimeRefDisplay(auctionCase: AuctionCaseLike) {
  const { bidStartsAt, bidEndsAt } = auctionCase;
  const status = getAuctionCaseStatus(auctionCase);

  switch (status) {
    case 'BEFORE_BIDDING':
      return `시작 일시: ${format(bidStartsAt, 'yyyy/MM/dd HH:mm')}`;
    case 'BIDDING':
    case 'FINISHED_BIDDING':
    default:
      return `종료 일시: ${format(bidEndsAt, 'yyyy/MM/dd HH:mm')}`;
  }
}

export function getRemainingTimeDisplay(auctionCase: AuctionCaseLike) {
  const { bidStartsAt, bidEndsAt } = auctionCase;
  const status = getAuctionCaseStatus(auctionCase);
  const criteriaDateTime = status === 'BEFORE_BIDDING' ? bidStartsAt : bidEndsAt;
  const totalSeconds = differenceInSeconds(criteriaDateTime, new Date());
  return formatSeconds(totalSeconds);
}

export function getAuctionCaseColor(auctionCase: AuctionCaseLike): ListItemColor {
  const { bidStartsAt, bidEndsAt } = auctionCase;
  const status = getAuctionCaseStatus(auctionCase);
  const criteriaDateTime = status === 'BEFORE_BIDDING' ? bidStartsAt : bidEndsAt;
  const totalSeconds = differenceInSeconds(criteriaDateTime, new Date());

  if (totalSeconds > ONE_DAY) return 'green';
  if (totalSeconds > ONE_HOUR) return 'yellow';
  if (totalSeconds < 0) return 'gray';
  return 'red';
}

export function getHasBidden(auctionCase: AuctionCaseLike, userId?: string) {
  return {
    hasBidden: auctionCase.bids.some((bid) => bid.userId === userId),
    bid: auctionCase.bids.find((bid) => bid.userId === userId),
  };
}

export function categorizeAuctionCases(
  auctionCases: AuctionCaseLike[],
): Record<AuctionCaseStatus, AuctionCaseLike[]> {
  return auctionCases.reduce(
    (acc, cur) => {
      const status = getAuctionCaseStatus(cur);
      acc[status].push(cur);
      return acc;
    },
    {
      BIDDING: [] as AuctionCaseLike[],
      BEFORE_BIDDING: [] as AuctionCaseLike[],
      FINISHED_BIDDING: [] as AuctionCaseLike[],
    },
  );
}

export function filterBidDetails(auctionCase: AuctionCaseLike, userId?: string): AuctionCaseLike {
  const status = getAuctionCaseStatus(auctionCase);
  const bids = auctionCase.bids ?? [];

  switch (status) {
    case 'BIDDING':
      return {
        ...auctionCase,
        bids: bids.map((bid) => {
          return bid.userId === userId ? bid : { id: bid.id, userId: bid.userId };
        }),
      };
    case 'FINISHED_BIDDING':
    case 'BEFORE_BIDDING':
    default:
      return auctionCase;
  }
}
