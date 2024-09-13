import { formatCRN, formatPhoneNumber, formatTime, parseNumberAsString } from '@/lib/string';
import { useNumericFormat } from 'react-number-format';

export type Format =
  | 'numberOnly'
  | 'thousandSeparator'
  | 'phoneNumber'
  | 'companyRegistrationNumber'
  | 'time';

const defaultFormatter = (value: string) => value;
const defaultFormatRemover = (value: string) => value;

export const useFormatter = ({ format, maxLength }: { format?: Format; maxLength?: number }) => {
  const { format: numericFormat, removeFormatting: removeNumericFormat } = useNumericFormat({
    thousandSeparator: format === 'thousandSeparator',
    allowNegative: format === 'numberOnly',
    maxLength,
  });

  if (format === 'numberOnly') {
    return [numericFormat!, removeNumericFormat!];
  }

  if (format === 'thousandSeparator') {
    return [numericFormat!, removeNumericFormat!];
  }

  if (format === 'phoneNumber') {
    return [formatPhoneNumber, parseNumberAsString];
  }

  if (format === 'companyRegistrationNumber') {
    return [formatCRN, parseNumberAsString];
  }

  if (format === 'time') {
    return [formatTime, parseNumberAsString];
  }

  return [defaultFormatter, defaultFormatRemover];
};
