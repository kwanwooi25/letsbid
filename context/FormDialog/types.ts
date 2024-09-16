import { ComponentProps } from 'react';
import AuctionCaseForm from './AuctionCaseForm';
import GroupForm from './GroupForm';
import InvitationForm from './InvitationForm';

export type FormDialogProps =
  | DefaultProps
  | GroupFormProps
  | InvitationFormProps
  | AuctionCaseFormProps;

type DefaultProps = { type: undefined; formProps: undefined };

type GroupFormProps = {
  type: 'GROUP';
  formProps: ComponentProps<typeof GroupForm>;
};

type InvitationFormProps = {
  type: 'INVITATION';
  formProps: ComponentProps<typeof InvitationForm>;
};

type AuctionCaseFormProps = {
  type: 'AUCTION_CASE';
  formProps: ComponentProps<typeof AuctionCaseForm>;
};

export type FormDialogContextState = {
  openForm: (props: FormDialogProps) => void;
};
