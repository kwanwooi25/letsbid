import { getAppName } from '@/lib/env';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  const appName = getAppName();

  return {
    name: appName,
    short_name: appName,
    description: '부동산 경매 모의 입찰 시스템',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#33C85A',
    icons: [
      {
        src: '/runforyou-logo_192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/runforyou-logo_512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
