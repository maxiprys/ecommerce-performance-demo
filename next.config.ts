import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fakestoreapi.com", pathname: "/**" },
      { protocol: "https", hostname: "api.escuelajs.co", pathname: "/**" },
      { protocol: "https", hostname: "i.imgur.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "placeimg.com", pathname: "/**" },
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "cdsassets.apple.com", pathname: "/**" },
      { protocol: "https", hostname: "vive-y-se-feliz.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
