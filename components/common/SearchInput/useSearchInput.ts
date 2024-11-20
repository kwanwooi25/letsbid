'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useSearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const setSearch = (newSearch?: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (!newSearch) {
      newSearchParams.delete('search');
    } else {
      newSearchParams.set('search', newSearch);
    }

    if (searchParams.get('page')) {
      newSearchParams.set('page', '1');
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return {
    search,
    setSearch,
  };
}
