'use client';

import { Button } from '@/components/ui/button';
import { useHomeHeaderButtons } from './useHomeHeaderButtons';

export default function HomeHeaderButtons() {
  const { openCreateGroupForm } = useHomeHeaderButtons();

  return (
    <div className="flex items-center gap-2">
      <Button type="button" onClick={openCreateGroupForm}>
        그룹 생성
      </Button>
    </div>
  );
}
