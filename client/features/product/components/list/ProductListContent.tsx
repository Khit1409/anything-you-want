import ProductListContextProvider from "../../contexts/ProductListContext";
import ProductFilterSidebar from "../common/ProductFilterSidebar";
import ProductList from "./ProductList";
import ProductPanigation from "./ProductPanigation";

export default function ProductListContent() {
  return (
    <ProductListContextProvider>
      <ProductFilterSidebar />
      <ProductList />
      <ProductPanigation />
    </ProductListContextProvider>
  );
}
