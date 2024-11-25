import ArticleDetailSkeleton from '@/components/pages/ArticleDetail/skeleton';
import { withAuth } from '@/features/auth/withAuth';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ArticleDetail = dynamic(() => import('@/components/pages/ArticleDetail'), {
  ssr: false,
  loading: () => <ArticleDetailSkeleton />,
});

export default withAuth(function () {
  return (
    <Suspense fallback={<ArticleDetailSkeleton />}>
      <ArticleDetail />
    </Suspense>
  );
});
