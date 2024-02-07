/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.theaudiodb.com',
          port: '', 
          pathname: '/images/**',
        },
      ],
    },
  }

module.exports = {nextConfig}
