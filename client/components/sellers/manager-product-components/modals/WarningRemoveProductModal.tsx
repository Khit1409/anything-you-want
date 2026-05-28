"use client";

import useMangerProduct from "@/contexts/sellers/ManagerProductContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function WarningRemoveProductModal() {
  const { previews, handles } = useMangerProduct();
  const { setSelectedIdOpenModal, refetch } = previews;
  const { openWarningModal, onCloseWarningModal, handleDelete } = handles;

  return (
    openWarningModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="w-7 h-7 text-red-500"
              />
            </div>
          </div>

          {/* Text */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Xóa sản phẩm
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Bạn có chắc muốn xóa không? Hành động này không thể hoàn tác.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                onCloseWarningModal();
                setSelectedIdOpenModal(undefined);
              }}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={async () => {
                await handleDelete();
                setSelectedIdOpenModal(undefined);
                onCloseWarningModal();
                if (refetch) {
                  await refetch();
                }
              }}
              className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 active:bg-red-700 transition-colors"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    )
  );
}
