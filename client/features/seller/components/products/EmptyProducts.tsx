import { faBoxOpen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function EmptyProducts() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6 animate-fade-in">
      {/* Animated icon */}
      <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center animate-bounce">
        <FontAwesomeIcon icon={faBoxOpen} className="text-3xl text-gray-300" />
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="text-gray-500 font-medium text-base">
          Chưa có sản phẩm nào
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Bắt đầu bằng cách thêm sản phẩm đầu tiên của bạn.
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/seller/products/create"
        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-600 shadow-sm transition-all duration-200 hover:border-gray-500 hover:text-gray-800 hover:shadow-md active:scale-95"
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="text-xs transition-transform duration-200 group-hover:rotate-90"
        />
        Thêm sản phẩm
      </Link>
    </div>
  );
}
