'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { useFormDialog } from '@/context/FormDialog';

export default function Home() {
  const { openForm } = useFormDialog();

  const handleClickCreateGroup = () => {
    openForm({
      type: 'GROUP',
      formProps: {},
    });
  };

  return (
    <>
      <PageHeader title="내 그룹" className="max-w-2xl">
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline">
            초대 목록 보기
          </Button>
          <Button type="button" onClick={handleClickCreateGroup}>
            그룹 생성
          </Button>
        </div>
      </PageHeader>
      <PageBody className="max-w-2xl">그룹이 없습니다</PageBody>
    </>
  );
}
