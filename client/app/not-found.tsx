import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold text-white mb-4 animate-pulse">
          404
        </h1>

        {/* Not Found Text */}
        <h2 className="text-3xl font-semibold text-gray-300 mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
