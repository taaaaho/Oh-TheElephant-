/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    MINT_CONTRACT: process.env.MINT_CONTRACT,
    NETWORK: process.env.NETWORK,
  },
}
