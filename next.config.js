/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.wikimedia.org',
          port: ''
                },
      ],
    },
  }

module.exports = {nextConfig}
