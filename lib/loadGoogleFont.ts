export async function loadGoogleFont({
  font,
  weight = 400,
  text = '',
}: {
  font: string;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  text?: string;
}) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&display=swap&text=${encodeURIComponent(
    text,
  )}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  return new ArrayBuffer(8);
}
