import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatDateTime(
  date: Parameters<typeof format>[0],
  formatStr: Parameters<typeof format>[1],
) {
  return format(date, formatStr, { locale: ko });
}
