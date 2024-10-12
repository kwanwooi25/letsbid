import { ComponentProps } from 'react';
import BidExclusionForm from './BidExclusionForm';
import InvitationForm from './InvitationForm';

export type FormDialogProps = DefaultProps | InvitationFormProps | BidExclusionFormProps;

type DefaultProps = { type: undefined; formProps: undefined };

type InvitationFormProps = {
  type: 'INVITATION';
  formProps: ComponentProps<typeof InvitationForm>;
};

type BidExclusionFormProps = {
  type: 'BID_EXCLUSION';
  formProps: ComponentProps<typeof BidExclusionForm>;
};

export type FormDialogContextState = {
  openForm: (props: FormDialogProps) => void;
};
