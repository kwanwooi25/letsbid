'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { GroupWithMembers } from '@/types/group';
import { LucideCrown, LucideEdit2, LucideTrash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

export default function GroupListItem({ group, isHost }: Props) {
  const router = useRouter();

  const moveToGroup = () => router.push(`${PATHS.GROUP}/${group.id}`);

  const handleClickEditGroup: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] = (e) => {
    e.stopPropagation();
    // TODO
    console.log('edit group', group.id);
  };

  const handleClickDeleteGroup: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] = (e) => {
    e.stopPropagation();
    // TODO
    console.log('delete group', group.id);
  };

  return (
    <li
      className="flex items-center justify-between p-4 border border-primary/30 rounded-sm hover:bg-primary-foreground hover:cursor-pointer transition-colors"
      onClick={moveToGroup}
    >
      <div className="flex gap-2 items-center">
        <span className="text-xl font-semibold">{group.name}</span>
        {isHost && (
          <Avatar>
            <AvatarFallback>
              <LucideCrown size={18} />
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      {isHost && (
        <div className="flex gap-2 items-center">
          <Button type="button" size="icon" variant="ghost" onClick={handleClickEditGroup}>
            <LucideEdit2 />
          </Button>
          <Button type="button" size="icon" variant="ghost" onClick={handleClickDeleteGroup}>
            <LucideTrash2 />
          </Button>
        </div>
      )}
    </li>
  );
}

type Props = {
  group: GroupWithMembers;
  isHost?: boolean;
};
