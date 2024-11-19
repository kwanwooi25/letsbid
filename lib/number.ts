import chunk from 'lodash/chunk';

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

export const NUMBER_IN_KOREAN = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
export const NUMBER_UNIT_BELOW_THOUSANDS_IN_KOREAN = ['', '십', '백', '천'];
export const NUMBER_UNIT_ABOVE_THOUSANDS_IN_KOREAN = ['', '만', '억', '조', '경'];

export function readNumberInKorean(input: number | string) {
  const inputString = String(input);
  if (inputString.length > 20) return '';

  const inputArray = chunk(inputString.split('').reverse(), 4);

  const translatedInputs = inputArray.map((chunk, i) => {
    const chunkInKorean = chunk.map((digit, j) => {
      if (NUMBER_IN_KOREAN[+digit]) {
        return `${NUMBER_IN_KOREAN[+digit]}${NUMBER_UNIT_BELOW_THOUSANDS_IN_KOREAN[j]}`;
      }
      return '';
    });
    if (chunkInKorean.some((d) => d)) {
      return `${chunkInKorean.reverse().join('')}${NUMBER_UNIT_ABOVE_THOUSANDS_IN_KOREAN[i]}`;
    }
  });

  return translatedInputs.reverse().join(' ');
}
