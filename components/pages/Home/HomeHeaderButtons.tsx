'use client';

import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { useFormDialog } from '@/context/FormDialog';
import { useRouter } from 'next/navigation';

export default function HomeHeaderButtons() {
  const { openForm } = useFormDialog();
  const router = useRouter();

  const moveToInvitations = () => router.push(PATHS.INVITATION);

  const handleClickCreateGroup = () => {
    openForm({
      type: 'GROUP',
      formProps: {},
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button type="button" variant="secondary" onClick={moveToInvitations}>
        초대 목록 보기
      </Button>
      <Button type="button" onClick={handleClickCreateGroup}>
        그룹 생성
      </Button>
    </div>
  );
}
