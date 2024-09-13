/**
 * 숫자 혹은 문자를 숫자로만 구성된 문자열로 반환
 *
 * @param original 숫자 혹은 문자
 * @returns 숫자로만 구성된 문자열
 */
export const parseNumberAsString = (original?: string | number) => {
  if (!original) {
    return '';
  }

  return String(original).replace(/[^0-9]/g, '');
};

/**
 * 전화 번호 형태로 변환
 *
 * @param original
 * @returns 전화 번호 형태의 문자열 (ex. 010-1234-5678)
 */
export const formatPhoneNumber = (original?: string) => {
  if (!original) {
    return '';
  }

  return parseNumberAsString(original)
    .replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]{3,4})([0-9]{4})$/g, '$1-$2-$3')
    .replace(/(\-{1,2})$/g, '');
};

/**
 * 사업자 등록 번호 형태로 변환
 *
 * @param original
 * @returns 사업자 등록 번호 형태의 문자열 (ex. 123-45-67890)
 */
export const formatCRN = (original?: string) => {
  if (!original) {
    return '';
  }

  return parseNumberAsString(original)
    .replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, '$1-$2-$3')
    .replace(/(\-{1,2})$/g, '');
};

/**
 * 시간 형태로 변환
 *
 * @param original
 * @returns 시간 형태의 문자열 (ex. 00:00)
 */
export const formatTime = (original?: string) => {
  if (!original) {
    return '';
  }

  const parsedNumber = parseNumberAsString(original);

  if (+parsedNumber > 2400) {
    return '24:00';
  }

  return `${parsedNumber}`.replace(/^(\d{0,2})(\d{0,2})$/g, '$1:$2').replace(/(\:{1,2})$/g, '');
};

export const isValidUrl = (url?: string) => {
  if (!url) return false;

  return url.startsWith('http');
};
