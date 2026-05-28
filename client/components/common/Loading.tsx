"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Loading() {
  const { appLoading } = useSelector((state: RootState) => state.app);

  return (
    appLoading && (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-2xl shadow-xl px-8 py-6 flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Đang xử lý...</p>
        </div>
      </div>
    )
  );
}
