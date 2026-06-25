import React from "react";

export default function DividerLoginSection() {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-(--border)"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-(--surface) text-(--muted)">HOẶC</span>
      </div>
    </div>
  );
}
