export function squareMeterToPY(sqm?: number | string | null, decimal: number = 2) {
  if (!sqm) return null;

  return (+sqm / 3.3057).toFixed(decimal);
}

export function isValidNumber(input: unknown, includeNegative?: boolean) {
  if (includeNegative) {
    return typeof input === 'number' && input !== 0;
  }

  return typeof input === 'number' && input > 0;
}
