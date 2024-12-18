'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsGroupMember } from '@/features/group';
import { useLoggedInUser } from '@/hooks';
import { LucideEdit2, LucideMoreVertical, LucideTrash2 } from 'lucide-react';
import { HTMLAttributes, ReactNode, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { useAuctionCaseActions, useAuctionCaseRouter } from '../hooks';
import { AuctionCaseLike } from '../types';
import { getAuctionCaseStatus } from '../utils';

export default function AuctionCaseMenu({
  className,
  trigger,
  triggerClassName,
  auctionCase,
}: Props) {
  const { group } = auctionCase;
  const { loggedInUser } = useLoggedInUser();
  const [status, setStatus] = useState(getAuctionCaseStatus(auctionCase));
  const { isGroupAdmin } = useIsGroupMember(group);
  const isEditable = isGroupAdmin && loggedInUser && group.userRoles.includes(loggedInUser.role);
  const { moveToEditAuctionCase } = useAuctionCaseRouter();
  const { tryToDeleteAuctionCase } = useAuctionCaseActions();

  useInterval(() => {
    setStatus(getAuctionCaseStatus(auctionCase));
  }, 1000);

  if (!isEditable) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button className={triggerClassName} variant="ghost" size="icon">
            <LucideMoreVertical className="w-6 h-6" />
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className={className}>
        {isEditable && status !== 'FINISHED_BIDDING' && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              moveToEditAuctionCase(auctionCase);
            }}
          >
            <LucideEdit2 className="mr-2 h-4 w-4" />
            <span>경매 사건 수정</span>
          </DropdownMenuItem>
        )}
        {isEditable && (
          <DropdownMenuItem
            className="text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              tryToDeleteAuctionCase(auctionCase);
            }}
          >
            <LucideTrash2 className="mr-2 h-4 w-4" />
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
