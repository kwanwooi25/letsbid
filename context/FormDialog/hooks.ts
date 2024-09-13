import { useContext } from 'react';
import { FormDialogContext } from './context';

export function useFormDialog() {
  const context = useContext(FormDialogContext);

  if (!context) {
    throw new Error('useFormDialog must be used within FormDialogProvider');
  }

  return context;
}
