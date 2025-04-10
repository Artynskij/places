import path from "path";
import { fileURLToPath } from "url";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

// Определяем __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Создаем плагин для Next.js с `next-intl`
const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX({
  // Add markdown plugins here, as desired
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  sassOptions: {
    includePaths: [path.join(__dirname, "src/asset/common-styles")],
    prependData: `
      @import "index.scss";
    `,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "172.27.20.200",
      },
    ],
  },
};
// output: 'export'
// Merge MDX config with Next.js config
// export default withMDX(nextConfig)
// export default withNextIntl(nextConfig);
export default withNextIntl(withMDX(nextConfig));
