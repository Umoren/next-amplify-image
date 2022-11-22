/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextimagedemo10161247-dev.s3.amazonaws.com',
        port: '',
        pathname: '/public/**',
      },
    ],

  },
}
