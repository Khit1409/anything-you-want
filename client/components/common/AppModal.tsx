"use client";

import { closeModal } from "@/redux/slice/app.slice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  faCheckCircle,
  faTriangleExclamation,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

export default function AppModal() {
  const { modalState } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<AppDispatch>();

  if (!modalState) return <div id="app-modal" className="hidden"></div>;

  const { state, message, handle } = modalState;

  const modalContent = {
    title: () => {
      switch (state) {
        case "error":
          return "Thất bại!";
        case "success":
          return "Thành công!";
        default:
          return "Cảnh báo!";
      }
    },
    icon: () => {
      switch (state) {
        case "error":
          return faXmarkCircle;
        case "success":
          return faCheckCircle;
        default:
          return faTriangleExclamation;
      }
    },
    iconColor: () => {
      switch (state) {
        case "error":
          return "text-red-500";
        case "success":
          return "text-green-500";
        default:
          return "text-amber-500";
      }
    },
    bgGradient: () => {
      switch (state) {
        case "error":
          return "from-red-50 to-red-50/50";
        case "success":
          return "from-green-50 to-green-50/50";
        default:
          return "from-amber-50 to-amber-50/50";
      }
    },
    borderColor: () => {
      switch (state) {
        case "error":
          return "border-red-200";
        case "success":
          return "border-green-200";
        default:
          return "border-amber-200";
      }
    },
    accentColor: () => {
      switch (state) {
        case "error":
          return "red";
        case "success":
          return "green";
        default:
          return "amber";
      }
    },
  };

  function closeModalAction() {
    dispatch(closeModal());
  }

  return (
    <div
      className="w-screen h-screen fixed z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center animate-fadeIn"
      id="app-modal"
    >
      <div
        className={`bg-linear-to-br ${modalContent.bgGradient()} border ${modalContent.borderColor()} rounded-2xl shadow-2xl min-h-[320px] min-w-[500px] max-w-[600px] flex flex-col justify-between overflow-hidden animate-scaleIn`}
        id="app-modal-content"
      >
        {/* Header dengan gradient line */}
        <div
          className={`bg-linear-to-r ${
            state === "error"
              ? "from-red-500 to-red-600"
              : state === "success"
              ? "from-green-500 to-green-600"
              : "from-amber-500 to-amber-600"
          } h-1`}
        />

        {/* Icon dan Title */}
        <div className="pt-8 px-8 flex flex-col items-center gap-4">
          <div
            className={`${modalContent.iconColor()} text-6xl animate-bounce`}
          >
            <FontAwesomeIcon icon={modalContent.icon()} />
          </div>
          <h1
            id="modal-title"
            className={`text-3xl font-bold ${modalContent.iconColor()}`}
          >
            {modalContent.title()}
          </h1>
        </div>

        {/* Message */}
        <div className="px-8 py-6">
          <p className="text-center text-gray-700 text-base leading-relaxed">
            {message}
          </p>
        </div>

        {/* Buttons */}
        <div className="px-8 pb-8 flex gap-3 justify-center sm:justify-end">
          <button
            className="px-6 py-2.5 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all duration-200 transform hover:scale-105 active:scale-95"
            onClick={() => closeModalAction()}
          >
            Hủy
          </button>
          {handle && (
            <button
              className={`px-6 py-2.5 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                state === "error"
                  ? "bg-red-500 hover:bg-red-600"
                  : state === "success"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-amber-500 hover:bg-amber-600"
              }`}
              onClick={() => handle()}
            >
              Xác nhận
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}
