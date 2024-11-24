import ArticleDetail from '@/components/pages/ArticleDetail';
import ArticleDetailSkeleton from '@/components/pages/ArticleDetail/skeleton';
import { withAuth } from '@/features/auth/withAuth';
import { Suspense } from 'react';

export default withAuth(function () {
  return (
    <Suspense fallback={<ArticleDetailSkeleton />}>
      <ArticleDetail />
    </Suspense>
  );
});
