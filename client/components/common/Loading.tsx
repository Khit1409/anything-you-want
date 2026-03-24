"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Loading() {
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  return (
    // authLoading && (
    //   <div className="w-screen h-screen fixed z-9999">
    //     <div className="w-full h-full flex items-center justify-center backdrop-blur">
    //       <div className="w-[50px] h-[50px] border-3 border-green-500 rounded-full animate-spin border-t-transparent" />
    //     </div>
    //   </div>)
    <></>
  );
}
