/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tupiansvr.bes.com.tw',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
