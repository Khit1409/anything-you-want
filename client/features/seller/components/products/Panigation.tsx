import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useManagerProductList from "../../hooks/useManagerProductList";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Pagination() {
  const { onchangeFilter, setFilter, filter } = useManagerProductList();

  return (
    <div className="flex justify-center items-center py-3 px-4 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          disabled={filter.page === 1}
          onClick={() =>
            setFilter((prev) => ({ ...prev, page: prev.page - 1 }))
          }
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition-all duration-150 hover:border-gray-400 hover:text-gray-700 hover:shadow disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-400 disabled:hover:shadow-sm"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
        </button>

        {/* Page indicator */}
        <div className="flex items-center gap-1.5 px-3 h-9 rounded-lg border border-gray-200 bg-gray-50 shadow-sm">
          <span className="text-xs text-gray-400 font-medium tracking-wide uppercase select-none">
            Trang
          </span>
          <input
            name="page"
            value={filter.page}
            onChange={onchangeFilter}
            readOnly
            className="w-6 text-center text-sm font-semibold text-gray-700 bg-transparent outline-none select-none"
          />
        </div>

        {/* Next */}
        <button
          onClick={() =>
            setFilter((prev) => ({ ...prev, page: prev.page + 1 }))
          }
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition-all duration-150 hover:border-gray-400 hover:text-gray-700 hover:shadow"
        >
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </button>
      </div>
    </div>
  );
}
