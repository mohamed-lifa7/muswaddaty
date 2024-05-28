/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");


/** @type {import('next').NextConfig} */
const nextConfig = {
  // other next config here...
  images: {
    domains: ["liveblocks.io"],
  },
};
export default nextConfig;