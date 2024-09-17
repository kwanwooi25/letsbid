export const ONE_DAY = 86_000;
export const ONE_HOUR = 3_600;
export const ONE_MINUTE = 60;

export function formatSeconds(totalSeconds: number) {
  if (totalSeconds < 0) return '';

  const days = Math.floor(totalSeconds / ONE_DAY);
  const hoursRemainder = totalSeconds % ONE_DAY;
  const hours = Math.floor(hoursRemainder / ONE_HOUR);
  const minutesRemainder = hoursRemainder % ONE_HOUR;
  const minutes = Math.floor(minutesRemainder / ONE_MINUTE);
  const seconds = minutesRemainder % ONE_MINUTE;

  const textArray = [];
  if (days > 0) textArray.push(`${days}일`);
  if (hours > 0) textArray.push(`${hours}시간`);
  if (minutes > 0) textArray.push(`${minutes}분`);
  if (seconds > 0) textArray.push(`${seconds}초`);

  return textArray.join(' ');
}
