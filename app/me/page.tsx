import UserProfile from '@/app/me/components/UserProfile';
import { withAuth } from '@/lib/auth/hoc';

export default withAuth(UserProfile);
