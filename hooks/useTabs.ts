'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useTabs<T extends string>({ defaultTab }: Args<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = (searchParams.get('tab') as T) ?? defaultTab;
  const handleTabChange = (value: T | string) => {
    const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
    newSearchParams.set('tab', value);
    const query = newSearchParams.toString();
    const url = `${pathname}?${query}`;
    router.replace(url);
  };

  return {
    tab,
    handleTabChange,
  };
}

type Args<T> = {
  defaultTab: T;
};
