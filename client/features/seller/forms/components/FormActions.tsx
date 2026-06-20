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
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/seller/products"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
          {cancelLabel}
        </Link>
        <div className="flex gap-3">
          {onAction && actionLabel && (
            <button
              type="button"
              disabled={isLoading}
              onClick={onAction}
              className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 disabled:cursor-not-allowed rounded-lg transition-colors"
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
              className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:bg-red-400 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faTrash} className="text-sm" />
              {deleteLabel}
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faCheck} className="text-sm" />
            {isLoading ? "Đang lưu..." : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
