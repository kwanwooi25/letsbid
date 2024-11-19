'use client';

import {
  Pagination as PaginationBase,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useCurrentPage } from './useCurrentPage';
import { usePagination } from './usePagination';
import { getPagesToDisplay } from './utils';

export default function Pagination({
  onChange,
  firstPage = 1,
  lastPage,
  maxPagesToDisplay = 3,
}: Props) {
  const { currentPage } = useCurrentPage();
  const { moveToPage, moveToPrevPage, moveToNextPage } = usePagination({
    firstPage,
    lastPage,
    onPageChange: onChange,
  });

  const pages = Array.from({ length: lastPage }, (_, i) => ++i);
  const pagesToDisplay = getPagesToDisplay({ pages, currentPage, maxPagesToDisplay });

  return (
    <PaginationBase className="py-4">
      <PaginationContent>
        <PaginationItem onClick={moveToPrevPage}>
          <PaginationPrevious aria-disabled={currentPage === firstPage} />
        </PaginationItem>
        {!pagesToDisplay.includes(firstPage) && (
          <PaginationItem onClick={() => moveToPage(firstPage)}>
            <PaginationLink isActive={firstPage === currentPage}>{firstPage}</PaginationLink>
          </PaginationItem>
        )}
        {!pagesToDisplay.includes(firstPage) && !pagesToDisplay.includes(firstPage + 1) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pagesToDisplay.map((p) => (
          <PaginationItem key={p} onClick={() => moveToPage(p)}>
            <PaginationLink isActive={p === currentPage}>{p}</PaginationLink>
          </PaginationItem>
        ))}
        {!pagesToDisplay.includes(lastPage) && !pagesToDisplay.includes(lastPage - 1) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {!pagesToDisplay.includes(lastPage) && (
          <PaginationItem onClick={() => moveToPage(lastPage)}>
            <PaginationLink isActive={lastPage === currentPage}>{lastPage}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem onClick={moveToNextPage}>
          <PaginationNext aria-disabled={currentPage === lastPage} />
        </PaginationItem>
      </PaginationContent>
    </PaginationBase>
  );
}

type Props = {
  onChange?: (page: number) => void;
  firstPage?: number;
  lastPage: number;
  maxPagesToDisplay?: number;
};
