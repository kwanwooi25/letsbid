'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCurrentPage } from './useCurrentPage';

export function usePagination({ onPageChange, firstPage = 1, lastPage }: Args) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { currentPage } = useCurrentPage();

  const handlePageChange = (p: number) => {
    if (onPageChange) {
      onPageChange(p);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', `${p}`);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const moveToPage = (p: number) => handlePageChange(p);

  const moveToPrevPage = () => {
    const prevPage = Math.max(currentPage - 1, firstPage);
    handlePageChange(prevPage);
  };
  const moveToNextPage = () => {
    const nextPage = Math.max(currentPage + 1, lastPage);
    handlePageChange(nextPage);
  };

  return {
    moveToPage,
    moveToPrevPage,
    moveToNextPage,
  };
}

type Args = {
  onPageChange?: (page: number) => void;
  firstPage?: number;
  lastPage: number;
};
