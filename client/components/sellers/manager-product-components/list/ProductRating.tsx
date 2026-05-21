"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface ProductRatingProps {
  avg: number;
  total: number;
}

export default function ProductRating({ avg, total }: ProductRatingProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xs" />
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {avg.toFixed(1)}
        </span>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 w-max">
        ({total} đánh giá)
      </span>
    </div>
  );
}
