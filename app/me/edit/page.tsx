import UserForm from '@/components/pages/UserForm';
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
    title: `내 정보 수정 | ${session.user.name} | ${getAppName()}`,
  };
}

export default withAuth(UserForm);
