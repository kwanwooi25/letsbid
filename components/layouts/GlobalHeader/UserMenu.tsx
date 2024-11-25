'use client';

import UserImage from '@/components/common/UserImage';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { PATHS } from '@/const/paths';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserMenu({ className }: Props) {
  const { theme, setTheme } = useTheme();
  const { isLoggedIn, loggedInUser } = useLoggedInUser();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserImage src={loggedInUser?.image} alt={loggedInUser?.name} size={40} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={className}>
        {isLoggedIn && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push(PATHS.ME)}>
                <Icon name="user" className="mr-2 h-4 w-4" />
                <span>내 정보</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(PATHS.MY_BID_HISTORY)}>
                <Icon name="file-stack" className="mr-2 h-4 w-4" />
                <span>내 입찰 기록</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {theme === 'light' && <Icon name="sun" className="mr-2 h-4 w-4" />}
              {theme === 'dark' && <Icon name="moon" className="mr-2 h-4 w-4" />}
              {theme === 'system' && <Icon name="settings" className="mr-2 h-4 w-4" />}
              <span>테마</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <Icon name="sun" className="mr-2 h-4 w-4" />
                  <span>라이트</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <Icon name="moon" className="mr-2 h-4 w-4" />
                  <span>다크</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <Icon name="settings" className="mr-2 h-4 w-4" />
                  <span>시스템 설정</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isLoggedIn ? (
            <DropdownMenuItem onClick={() => signOut()}>
              <Icon name="log-out" className="mr-2 h-4 w-4" />
              <span>로그아웃</span>
            </DropdownMenuItem>
          ) : (
            <Link href={PATHS.SIGN_IN}>
              <DropdownMenuItem>
                <Icon name="log-in" className="mr-2 h-4 w-4" />
                <span>로그인</span>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type Props = {
  className?: string;
};
