import { ListItemColor } from '@/components/common/ListItem/types';
import { AuctionCaseLike, AuctionCaseStatus } from '@/features/auction-case/types';
import { formatDateTime } from '@/lib/datetime';
import { formatSeconds, ONE_DAY, ONE_HOUR } from '@/lib/time';
import { differenceInSeconds, isAfter } from 'date-fns';

export function getAuctionCaseStatus(auctionCase?: AuctionCaseLike | null): AuctionCaseStatus {
  if (!auctionCase) return 'FINISHED_BIDDING';

  const { bidStartsAt, bidEndsAt } = auctionCase;
  const now = new Date();

  if (isAfter(bidStartsAt, now)) return 'BEFORE_BIDDING';
  if (isAfter(bidEndsAt, now)) return 'BIDDING';
  return 'FINISHED_BIDDING';
}

export function getAuctionCaseTimeRefDisplay(auctionCase?: AuctionCaseLike | null) {
  if (!auctionCase) {
    return {
      bidStartsAt: '',
      bidEndsAt: '',
    };
  }

  const bidStartsAt = formatDateTime(auctionCase.bidStartsAt, 'yyyy/MM/dd HH:mm');
  const bidEndsAt = formatDateTime(auctionCase.bidEndsAt, 'yyyy/MM/dd HH:mm');

  return {
    bidStartsAt,
    bidEndsAt,
  };
}

export function getRemainingTimeDisplay(auctionCase?: AuctionCaseLike | null) {
  if (!auctionCase) return '';

  const { bidStartsAt, bidEndsAt } = auctionCase;
  const status = getAuctionCaseStatus(auctionCase);
  const criteriaDateTime = status === 'BEFORE_BIDDING' ? bidStartsAt : bidEndsAt;
  const totalSeconds = differenceInSeconds(criteriaDateTime, new Date());
  return formatSeconds(totalSeconds);
}

export function getAuctionCaseColor(auctionCase?: AuctionCaseLike | null): ListItemColor {
  if (!auctionCase) return 'gray';
  const { bidStartsAt, bidEndsAt } = auctionCase;
  const status = getAuctionCaseStatus(auctionCase);
  const criteriaDateTime = status === 'BEFORE_BIDDING' ? bidStartsAt : bidEndsAt;
  const totalSeconds = differenceInSeconds(criteriaDateTime, new Date());

  if (totalSeconds > ONE_DAY) return 'green';
  if (totalSeconds > ONE_HOUR) return 'yellow';
  if (totalSeconds < 0) return 'gray';
  return 'red';
}

export function getHasBidden(auctionCase?: AuctionCaseLike | null, userId?: string) {
  return {
    hasBidden: auctionCase?.bids.some((bid) => bid.userId === userId),
    bid: auctionCase?.bids.find((bid) => bid.userId === userId),
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

export function getFullAddress({
  address,
  addressDetail,
}: Pick<AuctionCaseLike, 'address' | 'addressDetail'>) {
  if (!!address && !!addressDetail) {
    return `${address} ${addressDetail}`;
  }

  if (!!address) {
    return address;
  }

  return null;
}
