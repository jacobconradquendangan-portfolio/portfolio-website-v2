import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // dev-only: allows HMR from local network (e.g. phone). Remove or tighten before deploy.
  allowedDevOrigins: ["192.168.100.*"],
};

export default nextConfig;
