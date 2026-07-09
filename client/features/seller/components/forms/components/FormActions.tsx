"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface FormActionsProps {
  submitLabel?: string;
  cancelLabel?: string;
  deleteLabel?: string;
  actionLabel?: string;
  isLoading?: boolean;
  onSubmit?: () => void;
  onAction?: () => void;
  deleteAction?: () => void;
}

export default function FormActions({
  submitLabel = "Lưu",
  cancelLabel = "Hủy",
  isLoading = false,
  onAction,
  actionLabel,
  deleteLabel,
  deleteAction,
}: FormActionsProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Cancel Button */}
        <Link
          href="/seller/products"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors w-full sm:w-auto"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
          {cancelLabel}
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onAction && actionLabel && (
            <button
              type="button"
              disabled={isLoading}
              onClick={onAction}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {actionLabel}
            </button>
          )}

          {deleteLabel && (
            <button
              type="button"
              disabled={isLoading}
              onClick={deleteAction}
              className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 border border-gray-300 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-800 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {deleteLabel}
            </button>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            {isLoading && (
              <FontAwesomeIcon
                icon={faSpinner}
                className="animate-spin text-xs"
              />
            )}
            {isLoading ? "Đang lưu..." : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
