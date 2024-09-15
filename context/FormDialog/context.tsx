import { Dialog } from '@/components/ui/dialog';
import { PropsWithChildren, createContext, useCallback, useState } from 'react';
import { DEFAULT_FORM_DIALOG_PROPS } from './const';
import GroupForm from './GroupForm';
import InvitationForm from './InvitationForm';
import { FormDialogContextState, FormDialogProps } from './types';

export const FormDialogContext = createContext<FormDialogContextState | null>(null);

export function FormDialogProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [formDialogProps, setFormDialogProps] = useState<FormDialogProps>({
    ...DEFAULT_FORM_DIALOG_PROPS,
  });

  const handleOpenChange = (open: boolean, props?: FormDialogProps) => {
    setIsOpen(open);
    setFormDialogProps({ ...DEFAULT_FORM_DIALOG_PROPS, ...props });
  };

  const openForm = useCallback((props: FormDialogProps) => {
    handleOpenChange(true, {
      ...DEFAULT_FORM_DIALOG_PROPS,
      // @ts-expect-error ignore
      type: props.type,
      formProps: {
        ...props.formProps,
        onSubmit: async () => {
          await props.formProps?.onSubmit?.();
          handleOpenChange(false);
        },
      },
    });
  }, []);

  return (
    <FormDialogContext.Provider value={{ openForm }}>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        {children}

        {formDialogProps.type === 'GROUP' && <GroupForm {...formDialogProps.formProps} />}

        {formDialogProps.type === 'INVITATION' && <InvitationForm {...formDialogProps.formProps} />}
      </Dialog>
    </FormDialogContext.Provider>
  );
}
