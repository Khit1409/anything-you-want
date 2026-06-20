"use client";

import FilterSidebar from "../components/products/FilterSidebar";
import Panigation from "../components/products/Panigation";
import ProductListTable from "../components/products/ProductListTable";
import ManagerProductListContextProvider from "../contexts/ManagerProductListContext";

export default function ManagerProductPage() {
  return (
    <ManagerProductListContextProvider>
      <FilterSidebar />
      <ProductListTable />
      <Panigation />
    </ManagerProductListContextProvider>
  );
}
