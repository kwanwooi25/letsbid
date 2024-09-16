'use client';

import { Button } from '@/components/ui/button';
import { useHomeHeaderButtons } from './useHomeHeaderButtons';

export default function HomeHeaderButtons() {
  const { moveToInvitations, openCreateGroupForm } = useHomeHeaderButtons();

  return (
    <div className="flex items-center gap-2">
      <Button type="button" variant="secondary" onClick={moveToInvitations}>
        초대 목록 보기
      </Button>
      <Button type="button" onClick={openCreateGroupForm}>
        그룹 생성
      </Button>
    </div>
  );
}
