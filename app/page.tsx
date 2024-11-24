import { PATHS } from '@/const/paths';
import { withAuth } from '@/features/auth/withAuth';
import { redirect, RedirectType } from 'next/navigation';

export default withAuth(function () {
  return redirect(PATHS.GROUP, RedirectType.replace);
});
