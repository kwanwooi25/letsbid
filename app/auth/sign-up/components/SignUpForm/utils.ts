import { SignUpFormSchema } from './formSchema';

export function getDefaultFormValues(email?: string): SignUpFormSchema {
  return {
    name: '',
    email: email || '',
    password: '',
    passwordConfirm: '',
  };
}
