/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === 'production' || process.env.EXPORT === 'true' ? { output: 'export' } : {}),
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'],
  },
}

module.exports = nextConfig
