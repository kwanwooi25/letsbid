'use client';

import { PATHS } from '@/const/paths';
import { useFormDialog } from '@/context/FormDialog';
import { useRouter } from 'next/navigation';

export function useHomeHeaderButtons() {
  const { openForm } = useFormDialog();
  const router = useRouter();

  const moveToInvitations = () => router.push(PATHS.INVITATION, { scroll: false });

  const openCreateGroupForm = () => {
    openForm({
      type: 'GROUP',
      formProps: {},
    });
  };

  return {
    moveToInvitations,
    openCreateGroupForm,
  };
}
