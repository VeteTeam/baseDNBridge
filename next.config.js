/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 🎯 Output standalone para hosting tradicional (DonWeb/Ferozo)
  output: 'standalone',
  // 🔧 Configuración para xlsx en el cliente
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
