import React from "react";

export default function SectionShowDataLoading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="p-2 flex gap-1 items-center">
        <span className="w-[10px] h-[10px] rounded-full bg-green-500 animate-bounce"></span>
        <span className="w-[10px] h-[10px] rounded-full bg-green-500 animate-bounce delay-25"></span>
        <span className="w-[10px] h-[10px] rounded-full bg-green-500 animate-bounce delay-50"></span>
        <span className="w-[10px] h-[10px] rounded-full bg-green-500 animate-bounce delay-75"></span>
        <span className="w-[10px] h-[10px] rounded-full bg-green-500 animate-bounce delay-100"></span>
        <span className="w-[10px] h-[10px] rounded-full bg-green-500 animate-bounce delay-125"></span>
      </div>
    </div>
  );
}
