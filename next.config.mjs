/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
      },
      {
        protocol: 'http',
        hostname: 'img1.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: 'images.letsbid.app',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/group',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
