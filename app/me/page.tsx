import UserProfile from '@/components/pages/UserProfile';
import { auth } from '@/features/auth';
import { withAuth } from '@/features/auth/withAuth';
import { getAppName } from '@/lib/env';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth();

  if (!session?.user) {
    return {};
  }

  return {
    title: `${session.user.name} | ${getAppName()}`,
  };
}

export default withAuth(UserProfile);
