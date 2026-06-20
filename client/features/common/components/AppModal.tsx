"use client";

import { useAppDispatch, useAppSelector } from "@/shared/redux/selector";
import {
  faCheckCircle,
  faTriangleExclamation,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closeModal } from "../redux/common.slice";


export default function AppModal() {
  const { modalState } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();

  if (!modalState) return <div id="app-modal" className="hidden"></div>;

  const { state, message, handle } = modalState;

  const config = {
    error: {
      title: "Thất bại!",
      icon: faXmarkCircle,
      iconColor: "text-red-500",
      bgIcon: "bg-red-100",
      confirmBtn: "bg-red-500 hover:bg-red-600 active:bg-red-700",
    },
    success: {
      title: "Thành công!",
      icon: faCheckCircle,
      iconColor: "text-green-500",
      bgIcon: "bg-green-100",
      confirmBtn: "bg-green-500 hover:bg-green-600 active:bg-green-700",
    },
    warning: {
      title: "Cảnh báo!",
      icon: faTriangleExclamation,
      iconColor: "text-amber-500",
      bgIcon: "bg-amber-100",
      confirmBtn: "bg-amber-500 hover:bg-amber-600 active:bg-amber-700",
    },
  };

  const { title, icon, iconColor, bgIcon, confirmBtn } =
    config[state as keyof typeof config] ?? config.warning;

  return (
    <div
      id="app-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        {/* Icon */}
        <div className="flex justify-center">
          <div
            className={`w-14 h-14 rounded-full ${bgIcon} flex items-center justify-center`}
          >
            <FontAwesomeIcon icon={icon} className={`w-7 h-7 ${iconColor}`} />
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-1 text-wrap">{message}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => dispatch(closeModal())}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          {handle && (
            <button
              onClick={() => handle()}
              className={`flex-1 py-2.5 rounded-xl text-white text-sm font-medium transition-colors ${confirmBtn}`}
            >
              Xác nhận
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
