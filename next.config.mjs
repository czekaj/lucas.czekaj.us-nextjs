/** @type {import('next').NextConfig} */
import withMDX from "@next/mdx";

const mdx = withMDX({
  extension: /\.mdx?$/,
});

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basePath =
  process.env.GITHUB_PAGES === "true" ? "/" + __dirname.split("/").pop() : "";

const nextConfig = {
  ...mdx,
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
