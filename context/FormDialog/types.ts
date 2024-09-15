import { ComponentProps } from 'react';
import GroupForm from './GroupForm';
import InvitationForm from './InvitationForm';

export type FormDialogProps = DefaultProps | GroupFormProps | InvitationFormProps;

type DefaultProps = { type: undefined; formProps: undefined };

type GroupFormProps = {
  type: 'GROUP';
  formProps: ComponentProps<typeof GroupForm>;
};

type InvitationFormProps = {
  type: 'INVITATION';
  formProps: ComponentProps<typeof InvitationForm>;
};

export type FormDialogContextState = {
  openForm: (props: FormDialogProps) => void;
};
