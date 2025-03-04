import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "randomuser.me"], // ✅ Allows Cloudinary images
  },
  compiler: {
    styledComponents: true, // ✅ If you're using styled-components
  },
  async redirects() {
    return [
      {
        source: "/user/me",
        destination: "http://195.35.9.39:3009/user/me",
        permanent: false, // Set to true if it's a permanent redirect (301)
      },
    ];
  },
};

export default nextConfig;
