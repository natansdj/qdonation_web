/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_ENDPOINT: process.env.API_ENDPOINT,
    },
    images: {
        domains: ['picsum.photos']
    }
}
export default nextConfig;
