/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.IMAGE_PROTOCOL,
        hostname: process.env.IMAGE_HOSTNAME,
        pathname: '**',
      },
      {
        protocol: process.env.IMAGE_PROTOCOL,
        hostname: 'qoinvoucher.s3.ap-southeast-1.amazonaws.com',
        pathname: '**',
      },
    ],
    domains: ['qoinvoucher.s3.ap-southeast-1.amazonaws.com'],
  }
}
export default nextConfig;
