import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force Turbopack to use the supersite root (avoid picking parent lockfile).
  turbopack: {
    root: path.join(__dirname),
  },
  // Ensure pdfkit is treated as a server package and not bundled by Webpack
  serverExternalPackages: ['pdfkit'],
};

export default nextConfig;
