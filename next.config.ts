/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false, // Disable LightningCSS
    css: false          // Disable built-in CSS optimizer
  },
};

export default nextConfig;
