'use client';

import { PATHS } from '@/const/paths';
import {
  LucideFileStack,
  LucideLogOut,
  LucideMails,
  LucideMoon,
  LucideSettings,
  LucideSun,
  LucideUser2,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import UserImage from '../UserImage';

export default function UserMenu({ className }: Props) {
  const { theme, setTheme } = useTheme();
  const session = useSession();
  const router = useRouter();
  const isAuthenticated = session.status === 'authenticated';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserImage src={session.data?.user?.image} alt={session.data?.user?.name} size={40} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={className}>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {theme === 'light' && <LucideSun className="mr-2 h-4 w-4" />}
              {theme === 'dark' && <LucideMoon className="mr-2 h-4 w-4" />}
              {theme === 'system' && <LucideSettings className="mr-2 h-4 w-4" />}
              <span>테마</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <LucideSun className="mr-2 h-4 w-4" />
                  <span>라이트</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <LucideMoon className="mr-2 h-4 w-4" />
                  <span>다크</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <LucideSettings className="mr-2 h-4 w-4" />
                  <span>시스템 설정</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          {isAuthenticated && (
            <>
              <DropdownMenuItem onClick={() => router.push(PATHS.ME, { scroll: false })}>
                <LucideUser2 className="mr-2 h-4 w-4" />
                <span>내 정보</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(PATHS.INVITATION, { scroll: false })}>
                <LucideMails className="mr-2 h-4 w-4" />
                <span>초대 목록</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(PATHS.MY_BID_HISTORY, { scroll: false })}
              >
                <LucideFileStack className="mr-2 h-4 w-4" />
                <span>내 입찰 기록</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                <LucideLogOut className="mr-2 h-4 w-4" />
                <span>로그아웃</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type Props = {
  className?: string;
};
