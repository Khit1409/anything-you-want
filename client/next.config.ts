import type { NextConfig } from "next";

/**
 * Cấu hình Next.js cho project.
 * - Đặt `turbopack.root` và cấu hình `images.remotePatterns` cho phép tải ảnh từ nguồn bên ngoài.
 * - Không thay đổi runtime, chỉ mô tả mục đích file cấu hình.
 */
const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
