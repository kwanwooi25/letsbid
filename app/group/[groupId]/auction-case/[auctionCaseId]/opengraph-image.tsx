/* eslint-disable @next/next/no-img-element */
import { getAuctionCaseDetailQueryOptions } from '@/features/auction-case/query';
import { getFullAddress } from '@/features/auction-case/utils';
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

export default async function Image({
  params,
}: {
  params: { groupId: string; auctionCaseId: string };
}) {
  const logoData = await readFile(join(process.cwd(), 'public/letsbid_logo_with_text_1000w.png'));
  const logoSrc = Uint8Array.from(logoData).buffer as unknown as string;

  const queryClient = getQueryClient();
  const auctionCase = await queryClient.fetchQuery(
    getAuctionCaseDetailQueryOptions(params.auctionCaseId),
  );

  const { caseName = '경매 사건', address = '', addressDetail = '' } = auctionCase ?? {};
  const fullAddress = getFullAddress({ address, addressDetail }) ?? '';
  const [firstLine, secondLine] = fullAddress.split('(');

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
        <img src={logoSrc} alt="letsbid" width="50%" />
        <span style={{ fontSize: 90, color: '#181818' }}>{caseName}</span>
        <span style={{ fontSize: 40, color: '#686868', textAlign: 'center' }}>{firstLine}</span>
        <span
          style={{ fontSize: 40, color: '#686868', textAlign: 'center' }}
        >{`(${secondLine}`}</span>
      </div>
    ),
    {
      fonts: [
        {
          name: 'Noto Sans KR / 700',
          data: await loadGoogleFont({ font: 'Noto Sans KR', weight: 500 }),
          style: 'normal',
        },
      ],
    },
  );
}
