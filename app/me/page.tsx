import UserProfile from '@/components/pages/UserProfile';
import { withAuth } from '@/features/auth/withAuth';

export default withAuth(UserProfile);
