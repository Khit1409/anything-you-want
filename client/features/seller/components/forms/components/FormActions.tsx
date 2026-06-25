"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faRefresh,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

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
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Cancel Button */}
        <Link
          href="/seller/products"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded transition-colors w-full sm:w-auto"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
          {cancelLabel}
        </Link>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {onAction && actionLabel && (
            <button
              type="button"
              disabled={isLoading}
              onClick={onAction}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-amber-400 disabled:to-amber-400 disabled:cursor-not-allowed rounded transition-colors w-full sm:w-auto"
            >
              <FontAwesomeIcon icon={faRefresh} className="text-sm" />
              {actionLabel}
            </button>
          )}

          {deleteLabel && (
            <button
              type="button"
              disabled={isLoading}
              onClick={deleteAction}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-red-400 disabled:to-red-400 disabled:cursor-not-allowed rounded transition-colors w-full sm:w-auto"
            >
              <FontAwesomeIcon icon={faTrash} className="text-sm" />
              {deleteLabel}
            </button>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 px-7 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-400 disabled:cursor-not-allowed rounded transition-colors w-full sm:w-auto"
          >
            <FontAwesomeIcon icon={faCheck} className="text-sm" />
            {isLoading ? "Đang lưu..." : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
