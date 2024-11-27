export function createSearchParams(
  params: Record<string, string | undefined | null>,
): URLSearchParams {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (!!value) {
      searchParams.set(key, value);
    }
  });

  return searchParams;
}
