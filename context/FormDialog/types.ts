import { ComponentProps } from 'react';
import BidExclusionForm from './BidExclusionForm';
import JoinPrivateGroupForm from './JoinPrivateGroupForm';

export type FormDialogProps = DefaultProps | BidExclusionFormProps | JoinPrivateGroupFormProps;

type DefaultProps = { type: undefined; formProps: undefined };

type BidExclusionFormProps = {
  type: 'BID_EXCLUSION';
  formProps: ComponentProps<typeof BidExclusionForm>;
};

type JoinPrivateGroupFormProps = {
  type: 'JOIN_PRIVATE_GROUP';
  formProps: ComponentProps<typeof JoinPrivateGroupForm>;
};

export type FormDialogContextState = {
  openForm: (props: FormDialogProps) => void;
};
