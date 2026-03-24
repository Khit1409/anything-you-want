"use client";

import { useBackToTop } from "@/hooks/common/useBackToTop";

export default function BackToTopButton() {
  const show = useBackToTop();

  if (!show) return null;

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="fixed bottom-6 right-6 px-4 py-2 rounded-xl shadow bg-linear-to-t from-purple-400 to-purple-800 text-white"
    >
      ↑ Back to Top
    </button>
  );
}
