import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/resume_portfolio",
        destination: "/Andrew_Zheng_Resume_Portfolio.pdf",
      },
    ];
  },
};

export default nextConfig;
