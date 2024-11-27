/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
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
