import UserForm from '@/app/me/components/UserForm';
import { withAuth } from '@/lib/auth/hoc';

export default withAuth(UserForm);
