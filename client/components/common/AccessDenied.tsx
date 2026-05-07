import React from "react";

interface AccessDeniedProps {
  message?: string;
  backLink?: string;
  backLinkText?: string;
}

export default function AccessDenied({
  message = "Bạn không có quyền truy cập trang này",
  backLink = "/",
  backLinkText = "Quay lại trang chủ",
}: AccessDeniedProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-(--surface-muted)">
      <div className="bg-(--surface) rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {/* Warning Icon */}
        <div className="mb-4 flex justify-center">
          <div className="bg-red-100 rounded-full p-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4v2m0 4v2m0-12a9 9 0 110-18 9 9 0 010 18z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-(--title) mb-3">
          Quyền truy cập bị từ chối
        </h1>

        {/* Message */}
        <p className="text-(--muted) mb-6">{message}</p>

        {/* Back Link */}
        <a
          href={backLink}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          {backLinkText}
        </a>
      </div>
    </div>
  );
}
