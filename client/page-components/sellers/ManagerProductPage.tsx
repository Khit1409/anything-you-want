"use client";

import { ManagerProductContent } from "@/components/sellers/products";
import { ManagerProductProvider } from "@/contexts/sellers/ManagerProductContext";

export default function ManagerProductPage() {
  return (
    <ManagerProductProvider>
      <ManagerProductContent />
    </ManagerProductProvider>
  );
}
