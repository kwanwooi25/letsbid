'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LucideEdit2,
  LucideEye,
  LucideEyeOff,
  LucideLogOut,
  LucideMoreVertical,
  LucideTrash2,
} from 'lucide-react';
import { HTMLAttributes, ReactNode } from 'react';
import { GroupWithMembers } from './types';
import { useGroupActions } from './useGroupActions';
import { useGroupRouter } from './useGroupRouter';
import { useIsGroupMember } from './useIsGroupMember';

export default function GroupMenu({ className, trigger, triggerClassName, group }: Props) {
  const { isGroupHost, isViceGroupHost, isGroupMember } = useIsGroupMember(group);
  const { moveToEditGroup } = useGroupRouter();
  const { tryToArchiveGroup, tryToUnarchiveGroup, tryToDeleteGroup, tryToMoveOutFromGroup } =
    useGroupActions();

  const isGroupAdmin = isGroupHost || isViceGroupHost;
  const isArchived = !!group.archivedAt;

  if (!isGroupMember) return null;

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
        {isGroupAdmin && !isArchived && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              moveToEditGroup(group.id);
            }}
          >
            <LucideEdit2 className="mr-2 h-4 w-4" />
            <span>그룹 수정</span>
          </DropdownMenuItem>
        )}
        {isGroupAdmin && !isArchived && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              tryToArchiveGroup(group);
            }}
          >
            <LucideEyeOff className="mr-2 h-4 w-4" />
            <span>그룹 숨김</span>
          </DropdownMenuItem>
        )}
        {isGroupAdmin && isArchived && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              tryToUnarchiveGroup(group);
            }}
          >
            <LucideEye className="mr-2 h-4 w-4" />
            <span>그룹 숨김 해제</span>
          </DropdownMenuItem>
        )}
        {isGroupHost && (
          <DropdownMenuItem
            className="text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              tryToDeleteGroup(group);
            }}
          >
            <LucideTrash2 className="mr-2 h-4 w-4" />
            <span>그룹 삭제</span>
          </DropdownMenuItem>
        )}
        {!isGroupHost && isGroupMember && (
          <DropdownMenuItem
            className="text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              tryToMoveOutFromGroup(group);
            }}
          >
            <LucideLogOut className="mr-2 h-4 w-4" />
            <span>그룹 나가기</span>
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
      group: GroupWithMembers;
    }
  | {
      className?: string;
      trigger?: never;
      triggerClassName?: HTMLAttributes<HTMLButtonElement>['className'];
      group: GroupWithMembers;
    };
