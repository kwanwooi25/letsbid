'use client';

import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import Link from 'next/link';

export default function UserProfileHeaderButtons() {
  return (
    <div className="flex items-center gap-2">
      <Link href={PATHS.EDIT_USER_PROFILE} passHref scroll={false}>
        <Button type="button">정보 수정</Button>
      </Link>
    </div>
  );
}
