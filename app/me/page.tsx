import UserProfile from '@/components/pages/UserProfile';
import { withAuth } from '@/lib/auth/hoc';

export default withAuth(UserProfile);
