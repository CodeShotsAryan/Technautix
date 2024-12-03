import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',  // Increase the size limit to handle larger files
    },
  },
};

export default nextConfig;
