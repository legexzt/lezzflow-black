import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitLab Pages hosting
  output: "export",
  images: {
    // GitLab Pages has no image optimization server
    unoptimized: true,
  },
};

export default nextConfig;
