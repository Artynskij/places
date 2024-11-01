import path from 'path';
import { fileURLToPath } from 'url';
import createNextIntlPlugin from 'next-intl/plugin';

// Определяем __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Создаем плагин для Next.js с `next-intl`
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/asset/common-styles')],
    prependData: `
      @import "index.scss";
    `,
  },
};

export default withNextIntl(nextConfig);