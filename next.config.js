/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "nothingtosay322.pythonanywhere.com",
      },
      {
        protocol: "https",
        hostname: "shop.band-it.space",
      },
    ],
  },
};

module.exports = nextConfig;
