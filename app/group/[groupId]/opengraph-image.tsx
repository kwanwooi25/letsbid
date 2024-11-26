/* eslint-disable @next/next/no-img-element */
import { getGroupDetailQueryOptions } from '@/features/group/query';
import { loadGoogleFont } from '@/lib/loadGoogleFont';
import { getQueryClient } from '@/lib/query';
import { readFile } from 'fs/promises';
import { ImageResponse } from 'next/og';
import { join } from 'path';

export const alt = 'letsbid';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { groupId: string } }) {
  const logoData = await readFile(join(process.cwd(), 'public/letsbid_logo_with_text_1000w.png'));
  const logoSrc = Uint8Array.from(logoData).buffer as unknown as string;

  const queryClient = getQueryClient();
  const group = await queryClient.fetchQuery(getGroupDetailQueryOptions(params.groupId));

  const { name: groupName } = group;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <img src={logoSrc} alt="letsbid" width="70%" />
        <span style={{ fontSize: 80 }}>{groupName}</span>
      </div>
    ),
    {
      fonts: [
        {
          name: 'Noto Sans KR',
          data: await loadGoogleFont({ font: 'Noto Sans KR', weight: 400, text: groupName }),
          style: 'normal',
        },
      ],
    },
  );
}
