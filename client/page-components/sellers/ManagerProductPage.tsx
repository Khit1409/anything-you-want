"use client";

import ManagerProductContent from "@/components/sellers/manager-product-components/ManagerProductContent";
import { ManagerProductProvider } from "@/contexts/sellers/ManagerProductContext";

export default function ManagerProductPage() {
  return (
    <ManagerProductProvider>
      <ManagerProductContent />
    </ManagerProductProvider>
  );
}
