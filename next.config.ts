import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "randomuser.me"], // ✅ Allows Cloudinary images
  },
  compiler: {
    styledComponents: true, // ✅ If you're using styled-components
  },
};

export default nextConfig;
