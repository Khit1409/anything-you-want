import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ProductPanigation({
  setPage,
  page,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <section
      id="product-panigation"
      className="p-3 w-full border border-(--border) dark:(--border) bg-(--surface) dark:bg-(--surface)"
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex gap-2 items-center">
          <button
            disabled={page == 1}
            onClick={() => setPage((prev) => prev - 1)}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-colors
              ${
                page == 1
                  ? "text-(--muted) dark:text-zinc-600 cursor-not-allowed"
                  : "text-(--text) dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-400"
              }`}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
            Previous
          </button>

          {Array.from({ length: 3 }).map((_, index) => (
            <button
              key={index}
              className={`px-2 py-1 rounded transition-colors
                ${
                  page === index + 1
                    ? "bg-(--border) dark:bg-zinc-600 text-white"
                    : "text-(--text) dark:text-zinc-300 hover:bg-(--surface-muted) dark:hover:bg-zinc-800"
                }`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <span className="text-(--muted) dark:text-zinc-500">...</span>

          {page >= 4 && (
            <span className="px-2 py-1 rounded bg-(--border) dark:bg-zinc-600 text-white">
              {page}
            </span>
          )}

          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="flex items-center gap-1 px-2 py-1 rounded text-(--text) dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Next
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </section>
  );
}
