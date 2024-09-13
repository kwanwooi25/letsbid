import { type Format } from './hooks';

export const getDefaultMaxLength = (format?: Format) => {
  switch (format) {
    case 'phoneNumber':
      return 14;
    case 'companyRegistrationNumber':
      return 12;
    case 'time':
      return 5;
    default:
      return undefined;
  }
};
