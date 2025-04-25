import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin();

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/public/images/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/images/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/public/images/:path*`,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default withNextIntl(config);
