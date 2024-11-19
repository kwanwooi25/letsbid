import UserForm from '@/components/pages/UserForm';
import { withAuth } from '@/features/auth/hoc';

export default withAuth(UserForm);
