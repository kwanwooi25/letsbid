export function squareMeterToPY(sqm?: number | string | null, decimal: number = 2) {
  if (!sqm) return null;

  return (+sqm / 3.3057).toFixed(decimal);
}
