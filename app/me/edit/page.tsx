import UserForm from '@/components/pages/UserForm';
import { withAuth } from '@/features/auth/withAuth';

export default withAuth(UserForm);
