'use client';

import { LOCAL_STORAGE_KEYS } from '@/const/localStorage';
import { PATHS } from '@/const/paths';
import { useCurrentUrl } from '@/hooks/useCurrentUrl';
import { addDays, isAfter } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ComponentProps, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

export default function MobileNumberChecker() {
  const router = useRouter();
  const currentUrl = useCurrentUrl();
  const session = useSession();
  const [remindAt, setRemindAt] = useLocalStorage<string | undefined>(
    LOCAL_STORAGE_KEYS.MOBILE_NUMBER_ALERT_REMINDER,
    undefined,
  );
  const [shouldNotRemind, setShouldNotRemind] = useState<
    ComponentProps<typeof Checkbox>['checked']
  >(isAfter(new Date(String(remindAt)), new Date()));
  const loggedInUser = session?.data?.user;
  const [isOpen, setIsOpen] = useState(!shouldNotRemind && !loggedInUser?.mobile);

  const onClose = () => {
    if (shouldNotRemind) {
      setRemindAt(addDays(new Date(), 7).toISOString());
    }
  };

  const handleClickAction = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('callbackUrl', currentUrl);
    onClose();
    setIsOpen(false);
    router.push(`${PATHS.EDIT_USER_PROFILE}?${searchParams.toString()}`, { scroll: false });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>휴대폰 번호 필요</AlertDialogTitle>
          <AlertDialogDescription>
            원할한 서비스 이용을 위해 휴대폰 번호를 입력해 주세요
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex items-center gap-2">
          <Checkbox
            id={LOCAL_STORAGE_KEYS.MOBILE_NUMBER_ALERT_REMINDER}
            checked={shouldNotRemind}
            onCheckedChange={setShouldNotRemind}
          />
          <Label htmlFor={LOCAL_STORAGE_KEYS.MOBILE_NUMBER_ALERT_REMINDER}>
            일주일간 보지 않기
          </Label>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>닫기</AlertDialogCancel>
          <Button type="button" onClick={handleClickAction}>
            입력하기
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
