'use client';

import { useEffect, useState } from 'react';

export function useWindowScroll() {
  const [scrollY, setScrollY] = useState(0);

  const handleWindowScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  return {
    scrollY,
    isScrolled: scrollY > 0,
  };
}
