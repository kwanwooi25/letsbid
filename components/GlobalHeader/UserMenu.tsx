'use client';

import { PATHS } from '@/const/paths';
import {
  LucideLogOut,
  LucideMoon,
  LucideSettings,
  LucideSun,
  LucideUser,
  LucideUser2,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
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

export default function UserMenu({ className }: Props) {
  const { theme, setTheme } = useTheme();
  const session = useSession();
  const router = useRouter();
  const isAuthenticated = session.status === 'authenticated';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage src={session.data?.user?.image ?? ''} />
            <AvatarFallback>
              {!!session.data?.user?.name ? (
                session.data?.user.name.charAt(0).toUpperCase()
              ) : (
                <LucideUser />
              )}
            </AvatarFallback>
          </Avatar>
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
              <DropdownMenuItem onClick={() => router.push(PATHS.ME)}>
                <LucideUser2 className="mr-2 h-4 w-4" />
                <span>내 정보</span>
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
