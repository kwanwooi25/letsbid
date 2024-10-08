import UserForm from '@/components/pages/UserForm';
import { withAuth } from '@/lib/auth/hoc';

export default withAuth(UserForm);
