import UserProfile from '@/components/pages/UserProfile';
import { withAuth } from '@/features/auth/hoc';

export default withAuth(UserProfile);
