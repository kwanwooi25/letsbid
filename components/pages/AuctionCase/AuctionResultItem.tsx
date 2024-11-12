import BidRankBadge from '@/components/BidRankBadge';
import MeBadge from '@/components/MeBadge';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { useToast } from '@/components/ui/use-toast';
import WithTooltip from '@/components/WithTooltip';
import { useAlert } from '@/context/Alert';
import { useFormDialog } from '@/context/FormDialog';
import { useAxiosError } from '@/hooks/useAxiosError';
import { cn } from '@/lib/utils';
import { updateBidMutationOptions } from '@/queries/bid/mutation';
import { BidWithUser } from '@/types/bid';
import { useMutation } from '@tanstack/react-query';
import { LucideScrollText, LucideUserPlus, LucideUserX } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function AuctionResultItem({
  bid,
  rank,
  actualRank,
  isGroupHost,
  openBidDetail,
}: Props) {
  const session = useSession();
  const { openForm } = useFormDialog();
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const { mutateAsync: updateBid } = useMutation(updateBidMutationOptions);
  const { id, user, biddingPrice, isExcluded, excludedReason } = bid;
  const isMe = session?.data?.user?.id === user?.id;

  const handleClickExcludeBid = () => {
    openForm({
      type: 'BID_EXCLUSION',
      formProps: { bid },
    });
  };

  const handleClickIncludeBid = () => {
    openAlert({
      title: '입찰 참여',
      description: '입찰 제외를 취소하고 참여 처리하시겠습니까?',
      actionLabel: '입찰 참여 처리',
      action: async () => {
        try {
          await updateBid({ id, isExcluded: false, excludedReason: '' });
          toast({
            title: user.name,
            description: '입찰 참여 처리되었습니다',
            variant: 'success',
          });
          return true;
        } catch (error) {
          handleAxiosError(error);
          return false;
        }
      },
    });
  };

  const handleClickGiveUpBid = () => {
    openAlert({
      title: '입찰 포기',
      description: '입찰 포기 하시겠습니까?',
      actionLabel: '입찰 포기',
      action: async () => {
        try {
          await updateBid({ id, isExcluded: true, excludedReason: '입찰 포기' });
          toast({
            title: user.name,
            description: '입찰 포기되었습니다',
            variant: 'success',
          });
          return true;
        } catch (error) {
          handleAxiosError(error);
          return false;
        }
      },
    });
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="relative self-start md:self-center flex items-center gap-2">
        {actualRank <= 2 && !isExcluded && (
          <BidRankBadge className="absolute top-[-75%] left-[32px]" rank={actualRank} />
        )}
        <Chip variant="secondary" size="sm" icon>
          {rank}
        </Chip>
        <span
          className={cn(
            'line-clamp-1',
            rank && rank <= 2 && 'text-primary/80',
            isExcluded && 'text-gray-500 line-through',
          )}
        >
          {user?.name}
        </span>
        {isMe && <MeBadge />}
      </div>
      <div className="relative self-end flex flex-col items-end md:flex-row md:items-center gap-2 md:gap-3">
        {!!excludedReason && (
          <span className="absolute top-[-14px] left-[-42px] rotate-[-5deg] text-yellow-600 font-semibold">
            {excludedReason}
          </span>
        )}
        <span
          className={cn(
            'text-lg font-bold',
            rank === 1 && 'text-red-500',
            rank === 2 && 'text-orange-500',
            isExcluded && 'text-gray-500 line-through',
          )}
        >
          {biddingPrice?.toLocaleString()}
        </span>
        <div className="flex items-center">
          <WithTooltip tooltip="입찰표 보기">
            <Button size="icon" variant="ghost" onClick={openBidDetail}>
              <LucideScrollText />
            </Button>
          </WithTooltip>
          {isGroupHost && !isExcluded && (
            <WithTooltip tooltip="입찰 제외 처리">
              <Button size="icon" variant="ghost" onClick={handleClickExcludeBid}>
                <LucideUserX />
              </Button>
            </WithTooltip>
          )}
          {isExcluded && (isGroupHost || isMe) && (
            <WithTooltip tooltip="입찰 참여 처리">
              <Button size="icon" variant="ghost" onClick={handleClickIncludeBid}>
                <LucideUserPlus />
              </Button>
            </WithTooltip>
          )}
          {!isExcluded && !isGroupHost && isMe && (
            <WithTooltip tooltip="입찰 포기">
              <Button size="icon" variant="ghost" onClick={handleClickGiveUpBid}>
                <LucideUserX />
              </Button>
            </WithTooltip>
          )}
        </div>
      </div>
    </div>
  );
}

type Props = {
  bid: BidWithUser;
  rank: number;
  actualRank: number;
  isGroupHost?: boolean;
  openBidDetail: () => void;
};
