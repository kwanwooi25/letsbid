import PageBody from '@/components/layouts/PageBody';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import Link from 'next/link';

export default function GroupOverCrowded() {
  return (
    <PageBody className="max-w-xl flex flex-col items-center gap-8 py-20">
      <p className="text-xl font-semibold text-foreground/70">정원이 다 찼습니다</p>
      <Link href={PATHS.GROUP} passHref replace>
        <Button className="outline">그룹 목록으로</Button>
      </Link>
    </PageBody>
  );
}
