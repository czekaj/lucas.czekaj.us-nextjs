/** @type {import('next').NextConfig} */
import withMDX from "@next/mdx";

const mdx = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
  ...mdx,
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  output: "export",
};

export default nextConfig;
