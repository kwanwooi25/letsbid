import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { PropsWithChildren, createContext, useCallback, useState } from 'react';
import { DEFAULT_ALERT_PROPS } from './const';
import { AlertContextState, AlertProps } from './types';

export const AlertContext = createContext<AlertContextState | null>(null);

export function AlertProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertProps, setAlertProps] = useState<AlertProps>({ ...DEFAULT_ALERT_PROPS });

  const openAlert = useCallback((props: AlertProps) => {
    setIsOpen(true);
    setAlertProps({
      ...DEFAULT_ALERT_PROPS,
      ...props,
    });
  }, []);

  const handleClickAction = async () => {
    try {
      setIsLoading(true);
      const result = await alertProps.action?.();
      if (typeof result === 'boolean' && !result) {
        return;
      }
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertContext.Provider value={{ openAlert }}>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        {children}

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertProps.title}</AlertDialogTitle>
            {alertProps?.description && (
              <AlertDialogDescription>{alertProps.description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={alertProps.onCancel}>
              {alertProps.cancelLabel}
            </AlertDialogCancel>
            <Button type="button" onClick={handleClickAction} isLoading={isLoading}>
              {alertProps.actionLabel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertContext.Provider>
  );
}
