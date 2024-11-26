/* eslint-disable @next/next/no-img-element */
import { readFile } from 'fs/promises';
import { ImageResponse } from 'next/og';
import { join } from 'path';

export const alt = 'letsbid';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'public/letsbid_logo_with_text_1000w.png'));
  const logoSrc = Uint8Array.from(logoData).buffer as unknown as string;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <img src={logoSrc} alt="letsbid" width="70%" />
      </div>
    ),
  );
}
