'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useAlert } from '@/context/Alert';
import { useAxiosError } from '@/hooks/useAxiosError';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { getAuctionCaseStatus } from '@/lib/auctionCase';
import { deleteAuctionCaseMutationOptions } from '@/queries/auction-case/mutation';
import { AuctionCaseLike } from '@/types/auctionCase';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

export default function AuctionCaseHeaderButtons({ auctionCase }: Props) {
  const { openAlert } = useAlert();
  const { toast } = useToast();
  const router = useRouter();
  const currentUrl = useCurrentUrl();
  const { handleAxiosError } = useAxiosError();
  const deleteAuctionCaseMutation = useMutation(deleteAuctionCaseMutationOptions);
  const { id, groupId, caseName } = auctionCase;

  const status = getAuctionCaseStatus(auctionCase);

  const handleClickEdit: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] = (e) => {
    e.stopPropagation();
    router.push(
      `${PATHS.GROUP}/${groupId}${PATHS.AUCTION_CASE}/${id}/edit?callbackUrl=${currentUrl}`,
    );
  };

  const handleClickDelete: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] = (e) => {
    e.stopPropagation();
    openAlert({
      title: '경매 사건 삭제',
      description: (
        <>
          경매 사건을 삭제하면
          <br />
          해당 사건의 <b className="text-destructive">모든 입찰 내역이 삭제</b>
          됩니다.
          <br />
          경매 사건 (<b>{caseName}</b>) 을 삭제하시겠습니까?
        </>
      ),
      actionLabel: '삭제',
      action: async () => {
        try {
          await deleteAuctionCaseMutation.mutateAsync({ auctionCaseId: id, groupId });
          toast({
            title: caseName,
            description: '경매 사건이 삭제 되었습니다',
            variant: 'success',
          });
          router.replace(`${PATHS.GROUP}/${groupId}?tab=auctionCases`);
          return true;
        } catch (error) {
          handleAxiosError(error);
          return false;
        }
      },
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button type="button" onClick={handleClickEdit} disabled={status === 'FINISHED_BIDDING'}>
        수정
      </Button>
      <Button type="button" variant="destructive" onClick={handleClickDelete}>
        삭제
      </Button>
    </div>
  );
}

type Props = {
  auctionCase: AuctionCaseLike;
};
