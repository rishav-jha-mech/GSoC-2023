/** @type {import('next').NextConfig} */

// Static export, so this deploys to GitHub Pages / Netlify / Vercel with no server.
// For GitHub Pages under a subpath, set BASE_PATH=/your-repo-name before building.
const basePath = process.env.BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  // Static export cannot run the image optimiser, so screenshots are served as-is.
  // They're already modest in size and lazy-loaded.
  images: { unoptimized: true },
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
