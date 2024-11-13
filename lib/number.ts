import {
  numberInKorean,
  numberUnitAboveThousandsInKorean,
  numberUnitBelowThousandsInKorean,
} from '@/const/number';
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

export function readNumberInKorean(input: number | string) {
  const inputString = String(input);
  if (inputString.length > 20) return '';

  const inputArray = chunk(inputString.split('').reverse(), 4);

  const translatedInputs = inputArray.map((chunk, i) => {
    const chunkInKorean = chunk.map((digit, j) => {
      if (numberInKorean[+digit]) {
        return `${numberInKorean[+digit]}${numberUnitBelowThousandsInKorean[j]}`;
      }
      return '';
    });
    if (chunkInKorean.some((d) => d)) {
      return `${chunkInKorean.reverse().join('')}${numberUnitAboveThousandsInKorean[i]}`;
    }
  });

  return translatedInputs.reverse().join(' ');
}
