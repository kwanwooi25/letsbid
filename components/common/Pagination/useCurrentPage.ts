'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useCurrentPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const currentPage = page ? +page : 1;

  const setCurrentPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', `${p}`);
    router.push(`${pathname}?${params.toString()}`);
  };

  return { currentPage, setCurrentPage };
}
