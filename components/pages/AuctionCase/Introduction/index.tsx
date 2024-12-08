'use client';

import DetailRow from '@/components/common/DetailRow';
import Divider from '@/components/ui/divider';
import { AuctionCaseLike } from '@/features/auction-case/types';
import { formatDateTime } from '@/lib/datetime';
import { isValidNumber, squareMeterToPY } from '@/lib/number';
import { cn } from '@/lib/utils';
import { LucideCircleCheckBig, LucideCircleX } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import AuctionCaseIntroductionSkeleton from './skeleton';

export default function AuctionCaseIntroduction({ auctionCase }: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!auctionCase) return <AuctionCaseIntroductionSkeleton />;

  const {
    caseName,
    images = [],
    appraisedValue,
    startingBid,
    officialValue,
    actualBidStartsAt,
    area,
    floorLevel,
    floorPlan,
    hasElevator,
    completedYear,
  } = auctionCase;

  const startingBidText = (() => {
    if (appraisedValue > 0 && startingBid > 0) {
      const ratio = ((startingBid / appraisedValue) * 100).toFixed(0);
      return (
        <>
          <span className="text-sm font-semibold text-primary/50 mr-2">({ratio}%)</span>
          {startingBid.toLocaleString()}
        </>
      );
    }

    if (startingBid > 0) {
      return startingBid.toLocaleString();
    }

    return null;
  })();

  const areaText = (() => {
    if (typeof area !== 'number') return null;

    const areaInPY = squareMeterToPY(area);
    return (
      <>
        <span className="text-sm font-semibold text-primary/50 mr-2">({areaInPY}평)</span>
        <span>{area}㎡</span>
      </>
    );
  })();

  const floorPlanText = (() => {
    if (!floorPlan && !hasElevator) return null;

    const elevatorText = (
      <span className="flex items-center">
        엘베
        {hasElevator ? (
          <LucideCircleCheckBig className="w-4 h-4 ml-1 text-green-500" />
        ) : (
          <LucideCircleX className="w-4 h-4 ml-1 text-destructive" />
        )}
      </span>
    );

    if (!floorPlan) return elevatorText;

    return (
      <div className="flex items-center gap-1">
        <span>{floorPlan}</span> / {elevatorText}
      </div>
    );
  })();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 w-full sm:flex-row">
        <div className="flex flex-col gap-4 w-full">
          <DetailRow
            label="감정가"
            value={isValidNumber(appraisedValue) ? appraisedValue.toLocaleString() : '-'}
          />
          <DetailRow label="최저가" value={startingBidText || '-'} />
          <DetailRow
            label="공시가"
            value={isValidNumber(officialValue) ? officialValue.toLocaleString() : '-'}
          />
          <DetailRow
            label="실제 입찰일"
            value={actualBidStartsAt ? formatDateTime(actualBidStartsAt, 'yyyy-MM-dd (ccc)') : '-'}
          />
        </div>
        <Divider className="hidden sm:block" direction="vertical" />
        <div className="flex flex-col gap-4 w-full">
          <DetailRow label="건물 면적" value={areaText || '-'} />
          <DetailRow label="층" value={isValidNumber(floorLevel) ? floorLevel : '-'} />
          <DetailRow label="구조" value={floorPlanText || '-'} />
          <DetailRow label="준공연도" value={isValidNumber(completedYear) ? completedYear : '-'} />
        </div>
      </div>
      {!!images.length && (
        <>
          <Divider />
          {images.length > 1 && (
            <div className="flex items-center h-[80px] py-1 -mx-4 px-4 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-7 sm:h-auto gap-3">
              {images.map((image, index) => (
                <Image
                  key={image}
                  className={cn(
                    'h-full w-auto rounded-md aspect-square object-cover hover:cursor-pointer transition-transform',
                    selectedImageIndex === index &&
                      'border-2 p-0.5 border-yellow-300 dark:border-yellow-500 scale-110',
                  )}
                  src={image}
                  alt={caseName}
                  width={500}
                  height={500}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          )}
          <Link href={images[selectedImageIndex]}>
            <Image
              className="w-full rounded-md object-cover"
              src={images[selectedImageIndex]}
              alt={caseName}
              width={500}
              height={500}
            />
          </Link>
        </>
      )}
    </div>
  );
}

type Props = {
  auctionCase?: AuctionCaseLike;
};
