"use client";

import { useEffect, useState } from "react";

export function useBackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const marker = document.getElementById("top-page");
    if (!marker) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShow(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(marker);

    return () => observer.disconnect();
  }, []);

  return show;
}
