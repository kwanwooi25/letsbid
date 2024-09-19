import UserProfile from '@/components/UserProfile';
import { withAuth } from '@/lib/auth/hoc';

export default withAuth(UserProfile);
