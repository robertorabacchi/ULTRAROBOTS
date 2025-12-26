import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force Turbopack to use the supersite root (avoid picking parent lockfile).
  turbopack: {
    root: path.join(__dirname),
  },
  serverExternalPackages: [],
};

export default nextConfig;
