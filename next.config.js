/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
    unoptimized: true,
  },
  // distDir: "build", //this line will tell the build to create a file with this name
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
};
