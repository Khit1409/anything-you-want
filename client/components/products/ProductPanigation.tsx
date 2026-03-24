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
      className="p-3 w-full border border-gray-300"
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex gap-2 items-center">
          <button
            disabled={page == 1}
            onClick={() => setPage((prev) => prev - 1)}
            className={`${page == 1 ? "text-gray-300" : ""}`}
          >
            <FontAwesomeIcon icon={faAngleLeft} className="space-x-reverse" />
            Previous
          </button>
          {Array.from({ length: 3 }).map((_, index) => (
            <button
              key={index}
              className={`px-2 py-1 rounded ${
                page === index + 1 ? "bg-gray-400 text-white" : ""
              }`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <span>...</span>
          {page >= 4 && (
            <span className="px-2 py-1 rounded bg-gray-400 text-white">
              {page}
            </span>
          )}

          <button onClick={() => setPage((prev) => prev + 1)}>
            Next
            <FontAwesomeIcon icon={faAngleRight} className="" />
          </button>
        </div>
      </div>
    </section>
  );
}
