import { ComponentProps } from 'react';
import AuctionCaseForm from './AuctionCaseForm';
import BidExclusionForm from './BidExclusionForm';
import InvitationForm from './InvitationForm';

export type FormDialogProps =
  | DefaultProps
  | InvitationFormProps
  | AuctionCaseFormProps
  | BidExclusionFormProps;

type DefaultProps = { type: undefined; formProps: undefined };

type InvitationFormProps = {
  type: 'INVITATION';
  formProps: ComponentProps<typeof InvitationForm>;
};

type AuctionCaseFormProps = {
  type: 'AUCTION_CASE';
  formProps: ComponentProps<typeof AuctionCaseForm>;
};

type BidExclusionFormProps = {
  type: 'BID_EXCLUSION';
  formProps: ComponentProps<typeof BidExclusionForm>;
};

export type FormDialogContextState = {
  openForm: (props: FormDialogProps) => void;
};
