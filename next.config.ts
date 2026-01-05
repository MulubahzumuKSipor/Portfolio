import type { NextConfig } from "next";

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true, // recommended for catching potential issues
  reactCompiler: true,   // enable React Compiler if supported by your Next.js version
};

export default nextConfig;
