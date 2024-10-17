import { PATHS } from '@/const/paths';
import { withAuth } from '@/lib/auth/hoc';
import { redirect } from 'next/navigation';

export default withAuth(function () {
  return redirect(PATHS.GROUP);
});
