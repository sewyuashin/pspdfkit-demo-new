/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(worker\.js|worker\.js\.map|wasm)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/[hash][ext][query]'
      }
    });
    return config;
  },
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig 