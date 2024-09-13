import { ComponentProps } from 'react';
import GroupForm from './GroupForm';

export type FormDialogProps = DefaultProps | GroupFormProps;

type DefaultProps = { type: undefined; formProps: undefined };

type GroupFormProps = {
  type: 'GROUP';
  formProps: ComponentProps<typeof GroupForm>;
};

export type FormDialogContextState = {
  openForm: (props: FormDialogProps) => void;
};
