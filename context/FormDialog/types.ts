import { ComponentProps } from 'react';
import BidExclusionForm from './BidExclusionForm';

export type FormDialogProps = DefaultProps | BidExclusionFormProps;

type DefaultProps = { type: undefined; formProps: undefined };

type BidExclusionFormProps = {
  type: 'BID_EXCLUSION';
  formProps: ComponentProps<typeof BidExclusionForm>;
};

export type FormDialogContextState = {
  openForm: (props: FormDialogProps) => void;
};
