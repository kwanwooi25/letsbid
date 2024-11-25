'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { useIsGroupMember } from '@/features/group/useIsGroupMember';
import { HTMLAttributes, ReactNode, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { AuctionCaseLike } from './types';
import { useAuctionCaseActions } from './useAuctionCaseActions';
import { useAuctionCaseRouter } from './useAuctionCaseRouter';
import { getAuctionCaseStatus } from './utils';

export default function AuctionCaseMenu({
  className,
  trigger,
  triggerClassName,
  auctionCase,
}: Props) {
  const [status, setStatus] = useState(getAuctionCaseStatus(auctionCase));
  const { isGroupAdmin } = useIsGroupMember(auctionCase.group);
  const { moveToEditAuctionCase } = useAuctionCaseRouter();
  const { tryToDeleteAuctionCase } = useAuctionCaseActions();

  useInterval(() => {
    setStatus(getAuctionCaseStatus(auctionCase));
  }, 1000);

  if (!isGroupAdmin) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button className={triggerClassName} variant="ghost" size="icon">
            <Icon name="ellipsis-vertical" className="w-6 h-6" />
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className={className}>
        {isGroupAdmin && status !== 'FINISHED_BIDDING' && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              moveToEditAuctionCase(auctionCase);
            }}
          >
            <Icon name="pen" className="mr-2 h-4 w-4" />
            <span>경매 사건 수정</span>
          </DropdownMenuItem>
        )}
        {isGroupAdmin && (
          <DropdownMenuItem
            className="text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              tryToDeleteAuctionCase(auctionCase);
            }}
          >
            <Icon name="trash-2" className="mr-2 h-4 w-4" />
            <span>경매 사건 삭제</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type Props =
  | {
      className?: string;
      trigger?: ReactNode;
      triggerClassName?: never;
      auctionCase: AuctionCaseLike;
    }
  | {
      className?: string;
      trigger?: never;
      triggerClassName?: HTMLAttributes<HTMLButtonElement>['className'];
      auctionCase: AuctionCaseLike;
    };
