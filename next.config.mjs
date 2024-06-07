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
    ],
  }
}
export default nextConfig;
