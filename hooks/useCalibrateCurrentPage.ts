import { useCurrentPage } from '@/components/common/Pagination/useCurrentPage';
import { useEffect } from 'react';

export function useCalibrateCurrentPage(shouldCalibrate: boolean = false) {
  const { currentPage, setCurrentPage } = useCurrentPage();

  useEffect(() => {
    if (currentPage > 1 && shouldCalibrate) {
      setCurrentPage(1);
    }
  }, [currentPage, shouldCalibrate, setCurrentPage]);
}
