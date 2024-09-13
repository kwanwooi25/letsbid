import GroupForm from '@/components/dialogForms/GroupForm';
import { ComponentProps } from 'react';

export type FormDialogProps = DefaultProps | GroupFormProps;

type DefaultProps = { type: undefined; formProps: undefined };

type GroupFormProps = {
  type: 'GROUP';
  formProps: ComponentProps<typeof GroupForm>;
};

export type FormDialogContextState = {
  openForm: (props: FormDialogProps) => void;
};
