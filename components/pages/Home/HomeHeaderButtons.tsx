'use client';

import { Button } from '@/components/ui/button';
import { useFormDialog } from '@/context/FormDialog';

export default function HomeHeaderButtons() {
  const { openForm } = useFormDialog();

  const moveToInvitations = () => {
    // TODO
    console.log('moveToInvitations');
  };

  const handleClickCreateGroup = () => {
    openForm({
      type: 'GROUP',
      formProps: {},
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button type="button" variant="outline" onClick={moveToInvitations}>
        초대 목록 보기
      </Button>
      <Button type="button" onClick={handleClickCreateGroup}>
        그룹 생성
      </Button>
    </div>
  );
}
